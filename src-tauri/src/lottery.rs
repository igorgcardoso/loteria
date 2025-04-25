use rand::prelude::*;
use rayon::prelude::*;
use serde::{Deserialize, Serialize};
use std::{collections::HashSet, sync::Mutex};
use tauri_plugin_http::reqwest;

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LotteryContest {
    pub contest: usize,
    pub numbers: Vec<String>,
    pub lucky_month: Option<String>,
    pub heart_time: Option<String>,
    pub clovers: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct APIResponse {
    #[serde(rename = "concurso")]
    pub contest: usize,
    #[serde(rename = "dezenas")]
    pub numbers: Vec<String>,
    #[serde(rename = "mesSorte")]
    pub lucky_month: Option<String>,
    #[serde(rename = "timeCoracao")]
    pub heart_time: Option<String>,
    #[serde(rename = "trevos")]
    pub clovers: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum Lottery {
    DuplaSena,
    Lotofacil,
    Lotomania,
    MaisMilionaria,
    MegaSena,
    Quina,
    TimeMania,
}

impl From<&str> for Lottery {
    fn from(value: &str) -> Self {
        match value {
            "dupla-sena" => Lottery::DuplaSena,
            "lotofacil" => Lottery::Lotofacil,
            "lotomania" => Lottery::Lotomania,
            "mais-milionaria" => Lottery::MaisMilionaria,
            "mega-sena" => Lottery::MegaSena,
            "quina" => Lottery::Quina,
            "timemania" => Lottery::TimeMania,
            _ => Lottery::DuplaSena,
        }
    }
}

impl ToString for Lottery {
    fn to_string(&self) -> String {
        match self {
            Lottery::DuplaSena => "duplasena",
            Lottery::Lotofacil => "lotofacil",
            Lottery::Lotomania => "lotomania",
            Lottery::MaisMilionaria => "maismilionaria",
            Lottery::MegaSena => "megasena",
            Lottery::Quina => "quina",
            Lottery::TimeMania => "timemania",
        }
        .into()
    }
}

pub async fn get_context_for_lottery(lottery: Lottery) -> Result<LotteryContest, String> {
    let response = match reqwest::get(format!(
        "https://loteriascaixa-api.herokuapp.com/api/{}/latest",
        lottery.to_string()
    ))
    .await
    {
        Ok(response) => response,
        Err(err) => return Err(err.to_string()),
    };
    let contest = match response.json::<APIResponse>().await {
        Ok(contest) => contest,
        Err(err) => return Err(err.to_string()),
    };

    Ok(LotteryContest {
        contest: contest.contest,
        numbers: contest.numbers,
        lucky_month: contest.lucky_month,
        heart_time: contest.heart_time,
        clovers: contest.clovers,
    })
}

#[derive(Serialize, Deserialize)]
pub struct Card {
    pub card: usize,
    pub numbers: Vec<usize>,
}

#[tauri::command]
pub fn generate_cards(
    num_cards: usize,
    max_num: usize,
    num_to_draw: usize,
    numbers_to_keep: Vec<usize>,
    numbers_to_exclude: Vec<usize>,
) -> Vec<Card> {
    let cards = Mutex::new(Vec::new());

    (0..num_cards).into_par_iter().for_each(|_| {
        let mut numbers = HashSet::<usize>::from_iter(numbers_to_keep.iter().cloned());
        let mut rng = rand::rng();

        while numbers.len() < num_to_draw {
            let number = rng.random_range(1..=max_num);
            if !numbers_to_exclude.contains(&number) {
                numbers.insert(number);
            }
        }

        cards.lock().unwrap().push(numbers);
    });

    let cards_vec = cards.lock().unwrap();
    cards_vec
        .iter()
        .enumerate()
        .map(|(idx, numbers)| {
            let mut numbers = numbers.iter().cloned().collect::<Vec<_>>();
            numbers.sort();
            Card {
                card: idx + 1,
                numbers,
            }
        })
        .collect()
}
