import { Button } from '@chakra-ui/react';

function JoinButtons({ lobby, toggleJoin }) {
  return (
    <>
      <div className="seat1">
        <Button colorScheme="red" size="sm" name="seat1" onClick={(e) => toggleJoin(e)}>
          Toggle Join Seat 1
        </Button>
        <span>{lobby.seats?.seat1?.name}</span>
      </div>
      <div className="seat2">
        <Button colorScheme="orange" size="sm" name="seat2" onClick={(e) => toggleJoin(e)}>
          Toggle Join Seat 2
        </Button>
        <span>{lobby.seats?.seat2?.name}</span>
      </div>
      <div className="seat3">
        <Button colorScheme="yellow" size="sm" name="seat3" onClick={(e) => toggleJoin(e)}>
          Toggle Join Seat 3
        </Button>
        <span>{lobby.seats?.seat3?.name}</span>
      </div>
      <div className="seat4">
        <Button colorScheme="green" size="sm" name="seat4" onClick={(e) => toggleJoin(e)}>
          Toggle Join Seat 4
        </Button>
        <span>{lobby.seats?.seat4?.name}</span>
      </div>
      <div className="seat5">
        <Button colorScheme="blue" size="sm" name="seat5" onClick={(e) => toggleJoin(e)}>
          Toggle Join Seat 5
        </Button>
        <span>{lobby.seats?.seat5?.name}</span>
      </div>
      <div className="seat6">
        <Button colorScheme="purple" size="sm" name="seat6" onClick={(e) => toggleJoin(e)}>
          Toggle Join Seat 6
        </Button>
        <span>{lobby.seats?.seat6?.name}</span>
      </div>
      <div className="seat7">
        <Button colorScheme="pink" size="sm" name="seat7" onClick={(e) => toggleJoin(e)}>
          Toggle Join Seat 7
        </Button>
        <span>{lobby.seats?.seat7?.name}</span>
      </div>
      <div className="seat8">
        <Button colorScheme="teal" size="sm" name="seat8" onClick={(e) => toggleJoin(e)}>
          Toggle Join Seat 8
        </Button>
        <span>{lobby.seats?.seat8?.name}</span>
      </div>
      <div className="seat9">
        <Button colorScheme="cyan" size="sm" name="seat9" onClick={(e) => toggleJoin(e)}>
          Toggle Join Seat 9
        </Button>
        <span>{lobby.seats?.seat9?.name}</span>
      </div>
      <div className="seat10">
        <Button colorScheme="gray" size="sm" name="seat10" onClick={(e) => toggleJoin(e)}>
          Toggle Join Seat 10
        </Button>
        <span>{lobby.seats?.seat10?.name}</span>
      </div>
    </>
  );
}

export default JoinButtons;
