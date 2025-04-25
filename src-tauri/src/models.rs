use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Game {
    pub name: String,
    pub max_num: usize,
    pub drawn_num: usize,
    pub color: String,
    pub slug: String,
}
