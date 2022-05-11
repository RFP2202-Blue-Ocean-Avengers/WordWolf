import { useEffect, useContext } from "react";
import { StoreContext } from "../api/contextStore";
import { socket } from "../api/service/socket";
import Lobby from "../../components/Lobby";
import Game from "../../components/Game";

function Container() {
  const { lobby, setLobby, loginData } = useContext(StoreContext);

  const onInit = () => {
    const emit = loginData.create ? "createLobby" : "joinLobby";
    const payload = { name: loginData.name, lobby: loginData.lobby };
    socket.emit(emit, payload);
    socket.on("connectedToLobby", async (data) => {
      await setLobby(data.lobbyData);
    });
  };

  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    socket.on(`${loginData.lobby}`, (data) => {
      setLobby(data.lobbyData);
    });
  }, [socket]);

  // toggles player's spectator status'
  const toggleJoin = (e) => {
    e.preventDefault();
    const seat = e.target.name;
    const color = e.target.id;
    if (lobby.seats[seat]) {
      if (lobby.seats[seat].name === loginData.name) {
        socket.emit("toggleSpectate", {
          name: loginData.name,
          lobby: lobby.name,
        });
      } else {
        alert("seat already taken");
      }
    } else if (lobby.players[loginData.name].seat && !lobby.seats[seat]) {
      socket.emit("swapSeats", {
        name: loginData.name,
        lobby: lobby.name,
        seat,
        color,
      });
    } else {
      socket.emit("toggleJoin", {
        name: loginData.name,
        lobby: lobby.name,
        seat,
        color,
      });
    }
  };

  const toggleSpectate = (e) => {
    e.preventDefault();
    if (!lobby.players[loginData.name].spectator) {
      socket.emit("toggleSpectate", {
        name: loginData.name,
        lobby: lobby.name,
      });
    } else {
      alert("You're already a spectator");
    }
  };

  // starts the game
  // if less than 4 players are joined do not let the game start
  const onGameStart = () => {
    const joinedCount = Object.keys(lobby.players).reduce(
      (prev, player) => (!lobby.players[player].spectator ? prev + 1 : prev),
      0
    );

    if (joinedCount < 4) {
      alert("unable to start with less than 4 players joined");
      return;
    }
    // emit game start to the server and swap the page to the game
    socket.emit("gameStart", lobby.name);
  };

  const onMayorPick = (word) => {
    socket.emit("onMayorPick", { lobby: lobby.name, word });
  };

  const afterQuestionsRound = (condition) => {
    socket.emit(condition, { lobby: lobby.name, condition });
  };

  // resets the game state to be a clean state
  const resetGame = () => {
    socket.emit("resetGame", lobby.name);
  };

  const updateTimer = (settings) => {
    socket.emit('updateTimer', { settings, lobby: lobby.name });
  };

  const display = () => {
    const gameArray = [
      "mayorPick",
      "quetsionRound",
      "wordGuessed",
      "outOfTokens",
      "outOfTime",
    ];
    let gameState;
    if (gameArray.includes(lobby.gameState)) {
      gameState = "game";
    } else {
      gameState = lobby.gameState;
    }

    switch (gameState) {
      case "lobby":
        return (
          <div>
            <Lobby
              lobby={lobby}
              toggleJoin={toggleJoin}
              toggleSpectate={toggleSpectate}
              onGameStart={onGameStart}
              loginData={loginData}
              updateTimer={updateTimer}
            />
          </div>
        );
      case "game":
        return (
          <div>
            <Game
              lobby={lobby}
              onMayorPick={onMayorPick}
              afterQuestionsRound={afterQuestionsRound}
              resetGame={resetGame}
              loginData={loginData}
              updateTimer={updateTimer}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* {lobby && display()} */}
      {/* for testing purposes, I've displayed all the states of
      the game out onto the lobby screen by default */}
      {lobby
      && (
      <>
        <Lobby
          lobby={lobby}
          toggleJoin={toggleJoin}
          toggleSpectate={toggleSpectate}
          onGameStart={onGameStart}
          loginData={loginData}
          updateTimer={updateTimer}
        />
        <Game
          lobby={lobby}
          onMayorPick={onMayorPick}
          afterQuestionsRound={afterQuestionsRound}
          resetGame={resetGame}
          loginData={loginData}
          updateTimer={updateTimer}
        />
      </>
      )}
    </div>
  );
}

export default Container;
