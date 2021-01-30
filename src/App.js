import "./App.css";
// import { Img } from "./Img";
import { getDate } from "./getDate";
import { useEffect, useState } from "react";
import { LinearProgress, Button } from "@material-ui/core";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [items, setItems] = useState([]);
  const [gameStats, setGameStats] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [dateChange, setDateChange] = useState(false);

  function parseDate(date) {
    date = startDate.toString().substr(4, 11);

    console.log(date);
    return date;
    // let parsedDate = date.substr(4, 14);
    // return parsedDate;
  }

  function call() {
    setInterval(function () {
      fetch(
        `https://www.balldontlie.io/api/v1/games?per_page=100&dates[]=${parseDate(
          startDate
        )}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.data);
            // console.log(items);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }, 45000);
  }

  useEffect(() => {
    fetch(
      `https://www.balldontlie.io/api/v1/games?per_page=100&dates[]=${parseDate(
        startDate
      )}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
          console.log(items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    call();
    // console.log(getDate());
  }, []);

  function timeIcon() {
    return <span>&#128337;</span>;
  }

  function gameInfo(
    status,
    homeTeam,
    homeTeamScore,
    visitorTeam,
    visitorTeamScore,
    time,
    id
  ) {
    return (
      <div key={id} className="game">
        <p className={time !== "" ? "scores active-game" : "scores"}>
          {homeTeam}:{homeTeamScore} {visitorTeam}:{visitorTeamScore}
        </p>
        <p>
          <span>
            {status !== "1st Qtr" &&
            status !== "2nd Qtr" &&
            status !== "3rd Qtr" &&
            status !== "4th Qtr" &&
            status !== "Halftime" &&
            status !== "Final"
              ? timeIcon()
              : null}
          </span>{" "}
          <span
            className={
              status !== "1st Qtr" &&
              status !== "2nd Qtr" &&
              status !== "3rd Qtr" &&
              status !== "4th Qtr" &&
              status !== "Halftime"
                ? "upcoming-game"
                : null
            }
          >
            {status}
          </span>
          {time}
        </p>
        <Button
          className="view-game-btn"
          variant="contained"
          onClick={() => {
            viewGame(id, status);
          }}
        >
          View
        </Button>
        <br />
      </div>
    );
  }

  //
  // front page games area
  function listArea() {
    // console.log(items);
    return (
      <div id="list-cont">
        {items.map((item) =>
          gameInfo(
            item.status,
            item.home_team.abbreviation,
            item.home_team_score,
            item.visitor_team.abbreviation,
            item.visitor_team_score,
            item.time,
            item.id
          )
        )}
      </div>
    );
  }

  //
  // view game function area

  function viewGame(gameId, gameStatus) {
    setIsLoaded(false);
    //   initial call
    fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${gameId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          setSelectedGame(result.data);
          setIsLoaded(true);
          setGameStats(result.data);
          console.log(gameStats);
        },
        (error) => {
          console.log(error);
        }
      );

    //   update every 50sec
    if (gameStatus && selectedGame) {
      setInterval(function () {
        fetch(
          `https://www.balldontlie.io/api/v1/stats?per_page=100&game_ids[]=${gameId}`
        )
          .then((res) => res.json())
          .then(
            (result) => {
              // console.log(result);
              // console.log(selectedGame);
              setSelectedGame(result.data);
              setGameStats(result.data);
              console.log(gameStats);
            },
            (error) => {
              console.log(error);
            }
          );
      }, 50000);
      // console.log(selectedGame);
    }
  }
  //chooses team abbreviation
  function whichTeam(teamId) {
    let team;

    switch (teamId) {
      case 1:
        team = "ATL";
        break;
      case 2:
        team = "BOS";
        break;
      case 3:
        team = "BKN";
        break;
      case 4:
        team = "CHA";
        break;
      case 5:
        team = "CHI";
        break;
      case 6:
        team = "CLE";
        break;
      case 7:
        team = "DAL";
        break;
      case 8:
        team = "DEN";
        break;
      case 9:
        team = "DET";
        break;
      case 10:
        team = "GSW";
        break;
      case 11:
        team = "HOU";
        break;
      case 12:
        team = "IND";
        break;
      case 13:
        team = "LAC";
        break;
      case 14:
        team = "LAL";
        break;
      case 15:
        team = "MEM";
        break;
      case 16:
        team = "MIA";
        break;
      case 17:
        team = "MIL";
        break;
      case 18:
        team = "MIN";
        break;
      case 19:
        team = "NOP";
        break;
      case 20:
        team = "NYK";
        break;
      case 21:
        team = "OKC";
        break;
      case 22:
        team = "ORL";
        break;
      case 23:
        team = "PHI";
        break;
      case 24:
        team = "PHX";
        break;
      case 25:
        team = "POR";
        break;
      case 26:
        team = "SAC";
        break;
      case 27:
        team = "SAS";
        break;
      case 28:
        team = "TOR";
        break;
      case 29:
        team = "UTA";
        break;
      case 30:
        team = "WAS";
        break;
      default:
        team = "WTF";
    }

    return <div className="teamAbbreviation">{team}</div>;
  }
  //chooses team logo
  function whichLogo(teamId) {
    //another switch which picks the logo image
    let teamLogo;

    switch (teamId) {
      case 1:
        teamLogo = "/pics/logos/hawks.jpg";
        break;
      case 2:
        teamLogo = "/pics/logos/celtics.jpg";
        break;
      case 3:
        teamLogo = "/pics/logos/nets.jpg";
        break;
      case 4:
        teamLogo = "/pics/logos/hornets.jpg";
        break;
      case 5:
        teamLogo = "/pics/logos/bulls.jpg";
        break;
      case 6:
        teamLogo = "/pics/logos/cavs.jpg";
        break;
      case 7:
        teamLogo = "/pics/logos/mavs.jpg";
        break;
      case 8:
        teamLogo = "/pics/logos/nuggets.jpg";
        break;
      case 9:
        teamLogo = "/pics/logos/pistons.jpg";
        break;
      case 10:
        teamLogo = "/pics/logos/warriors.jpg";
        break;
      case 11:
        teamLogo = "/pics/logos/rockets.jpg";
        break;
      case 12:
        teamLogo = "/pics/logos/pacers.jpg";
        break;
      case 13:
        teamLogo = "/pics/logos/clippers.jpg";
        break;
      case 14:
        teamLogo = "/pics/logos/lakers.jpg";
        break;
      case 15:
        teamLogo = "/pics/logos/grizzlies.jpg";
        break;
      case 16:
        teamLogo = "/pics/logos/heat.jpg";
        break;
      case 17:
        teamLogo = "/pics/logos/bucks.jpg";
        break;
      case 18:
        teamLogo = "/pics/logos/timberwolves.jpg";
        break;
      case 19:
        teamLogo = "/pics/logos/pelicans.jpg";
        break;
      case 20:
        teamLogo = "/pics/logos/knicks.jpg";
        break;
      case 21:
        teamLogo = "/pics/logos/thunder.jpg";
        break;
      case 22:
        teamLogo = "/pics/logos/magic.jpg";
        break;
      case 23:
        teamLogo = "/pics/logos/76ers.jpg";
        break;
      case 24:
        teamLogo = "/pics/logos/suns.jpg";
        break;
      case 25:
        teamLogo = "/pics/logos/blazers.jpg";
        break;
      case 26:
        teamLogo = "/pics/logos/kings.jpg";
        break;
      case 27:
        teamLogo = "/pics/logos/spurs.jpg";
        break;
      case 28:
        teamLogo = "/pics/logos/raptors.jpg";
        break;
      case 29:
        teamLogo = "/pics/logos/jazz.jpg";
        break;
      case 30:
        teamLogo = "/pics/logos/wizards.jpg";
        break;
      default:
        teamLogo = "WTF";
    }

    return <img src={teamLogo} alt="team logo" className="logo" />;
  }
  //lists player's stats
  function playerStatsList(
    id,
    fName,
    lName,
    pts,
    ast,
    reb,
    stl,
    blk,
    fg_pct,
    min
  ) {
    return (
      <div id="player-tab">
        <div className="stats-player-box">
          <td>{fName}</td>
          <td>
            {lName} <span className="stat">{min}</span>
          </td>
          <td></td>
        </div>

        <td>
          <span className="stat">Pts:{pts}</span>{" "}
          <span className="stat">Reb:{reb}</span>
          <span className="stat">Ast:{ast}</span>
          <span className="stat">Stl:{stl}</span>
          <span className="stat">Blk:{blk}</span>
          <span className="stat">FG%:{fg_pct}</span>
        </td>
        <br />
      </div>
    );
  }

  // beginning of show individual game stats function
  function showStats(gameObject) {
    console.log(gameObject);
    //filters object into players for home team
    let playersHome = gameObject.filter(function (e) {
      return e.game.home_team_id === e.team.id;
    });

    //filters object into players for visiting team
    let playersAway = gameObject.filter(function (e) {
      return e.game.visitor_team_id === e.team.id;
    });
    return (
      <div id="wrapper">
        <div>
          <div id="selected-score-box">
            <h1>
              {whichLogo(gameObject[0].game.home_team_id)}
              <span>
                {whichTeam(gameObject[0].game.home_team_id)}{" "}
                {gameObject[0].game.home_team_score}
              </span>
            </h1>
            <h1 className="inline">
              {whichLogo(gameObject[0].game.visitor_team_id)}
              {whichTeam(gameObject[0].game.visitor_team_id)}{" "}
              {gameObject[0].game.visitor_team_score}
            </h1>
          </div>
          <div id="team-stats-box">
            <table>
              <p className="team-header-stats">
                {whichTeam(gameObject[0].game.home_team_id)}
              </p>
              {playersHome.map((item) => (
                <tr key={item.player.id}>
                  {playerStatsList(
                    item.team.id,
                    item.player.first_name,
                    item.player.last_name,
                    item.pts,
                    item.ast,
                    item.reb,
                    item.stl,
                    item.blk,
                    item.fg_pct,
                    item.min
                  )}
                </tr>
              ))}
            </table>

            <table>
              <p className="team-header-stats">
                {whichTeam(gameObject[0].game.visitor_team_id)}
              </p>
              {playersAway.map((item) => (
                <tr key={item.player.id}>
                  {playerStatsList(
                    item.team.id,
                    item.player.first_name,
                    item.player.last_name,
                    item.pts,
                    item.ast,
                    item.reb,
                    item.stl,
                    item.blk,
                    item.fg_pct,
                    item.min
                  )}
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
  //end of show individual game stats function

  //
  // start of app return statement
  if (error) {
    {
      console.log(error);

      return <div>Error: {error.message}</div>;
    }
  } else if (!isLoaded) {
    return <LinearProgress id="progressBar" />;
  } else if (selectedGame && selectedGame.length !== 0) {
    //shows individual game

    return (
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            setSelectedGame(null);
          }}
        >
          Return
        </Button>
        {showStats(selectedGame)}
      </div>
    );
  } else {
    return (
      <div>
        {/* <P text="hi" /> */}
        <div id="title-box-area">
          <span>
            <img
              id="bball"
              src="pics/basketball.gif"
              alt="basketball spinning"
            />
          </span>
          <h1 id="title">
            NBA Today
            <br />
            <span id="title-date">{getDate()}</span>
          </h1>
          {/* <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setDateChange(true);

              fetch(
                `https://www.balldontlie.io/api/v1/games?per_page=100&dates[]=${parseDate(
                  date
                )}`
              )
                .then((res) => res.json())
                .then(
                  (result) => {
                    setIsLoaded(true);
                    setItems(result.data);
                    // console.log("ran");
                  },
                  // Note: it's important to handle errors here
                  // instead of a catch() block so that we don't swallow
                  // exceptions from actual bugs in components.
                  (error) => {
                    setIsLoaded(true);
                    setError(error);
                  }
                );
              listArea();
            }}
          /> */}
          {/* {console.log(startDate)} */}
        </div>
        {listArea()}
      </div>
    );
  }
}

export default App;
