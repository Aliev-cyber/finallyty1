import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";

const SearchPage = () => {
  const cardData = [
    { id: "Для себя", color: "rgb(30, 50, 100)" },
    { id: "Чарты", color: "rgb(71, 125, 149)" },
    { id: "Новые релизы", color: "rgb(20, 138, 8)" },
    { id: "Рекомендации", color: "rgb(245, 155, 35)" },
    { id: "Мероприятия", color: "rgb(141, 103, 171)" },
    { id: "Для дома", color: "rgb(30, 50, 100)" },
    { id: "Настроение", color: "rgb(13, 115, 236)" },
    { id: "Эпохи", color: "rgb(140, 25, 50)" },
    { id: "Хип-хоп", color: "rgb(141, 103, 171)" },
    { id: "В машине", color: "rgb(140, 25, 50)" },
    { id: "Для геймеров", color: "rgb(71, 125, 149)" },
    { id: "Забота о себе", color: "rgb(220, 20, 140)" },
    { id: "League of legends", color: "rgb(220, 20, 140)" },
    { id: "Тренировки", color: "rgb(186, 93, 7)" },
    { id: "Релакс", color: "rgb(13, 115, 236)" },
    { id: "Фокус", color: "rgb(30, 50, 100)" },
    { id: "Сон", color: "rgb(141, 103, 171)" },
    { id: "Вечеринка", color: "rgb(115, 88, 255)" },
    { id: "Dance", color: "rgb(30, 50, 100)" },
    { id: "Джаз", color: "rgb(186, 93, 7)" },
  ];

  return (
    <header>
      <div className="search-bar">
        <SearchIcon className="search-icon" sx={{ fontSize: "40px" }} />
        <input
          className="search-input"
          placeholder="What do you want to listen to?"
          inputprops={{ "aria-label": "search", style: { color: "white" } }}
        />
      </div>
      <div>
        <h1 className="h1">Все остальное</h1>
      </div>
      <div className="card-container">
        {cardData.map((card, index) => (
          <div className="card" key={index} style={{ background: card.color }}>
            <div className="logo">
              <h1>{card.id}</h1>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default SearchPage;
