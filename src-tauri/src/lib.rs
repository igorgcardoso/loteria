use lottery::{generate_cards, get_context_for_lottery, Lottery, LotteryContest};
use models::Game;

mod lottery;
mod models;

#[tauri::command]
fn get_all_games() -> Result<Vec<Game>, String> {
    let games = [
        Game {
            name: "Mega Sena".into(),
            max_num: 60,
            drawn_num: 6,
            color: "#209869".into(),
            slug: "mega-sena".into(),
        },
        Game {
            name: "Lotofácil".into(),
            max_num: 25,
            drawn_num: 15,
            color: "#930089".into(),
            slug: "lotofacil".into(),
        },
        Game {
            name: "Quina".into(),
            max_num: 80,
            drawn_num: 5,
            color: "#260085".into(),
            slug: "quina".into(),
        },
        Game {
            name: "Lotománia".into(),
            max_num: 100,
            drawn_num: 50,
            color: "#f78100".into(),
            slug: "lotomania".into(),
        },
        Game {
            name: "Timemánia".into(),
            max_num: 80,
            drawn_num: 10,
            color: "#00ff48".into(),
            slug: "timemania".into(),
        },
        Game {
            name: "Dupla Sena".into(),
            max_num: 50,
            drawn_num: 6,
            color: "#a61324".into(),
            slug: "dupla-sena".into(),
        },
        Game {
            name: "+Milionária".into(),
            max_num: 50,
            drawn_num: 6,
            color: "#2E3078".into(),
            slug: "mais-milionaria".into(),
        },
        Game {
            name: "Dia de Sorte".into(),
            max_num: 31,
            drawn_num: 7,
            color: "#d3b315".into(),
            slug: "dia-de-sorte".into(),
        },
    ];

    Ok(games.into())
}

#[tauri::command]
async fn get_lottery_contest(lottery: &str) -> Result<LotteryContest, String> {
    let lottery = Lottery::from(lottery);

    let contest = get_context_for_lottery(lottery).await?;

    Ok(contest)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_all_games,
            get_lottery_contest,
            generate_cards
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
