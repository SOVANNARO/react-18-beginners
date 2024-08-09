import { Box, Button, SimpleGrid, Spinner } from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  gameQuery: GameQuery;
}

function GameGrid({ gameQuery }: Props) {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGame(gameQuery);
  const skeletonCount = isLoading ? 10 : 0;

  const fetchGamesCount =
    data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  return (
    <>
      {error && <p>Error fetching games: {error.message}</p>}
      <InfiniteScroll
        dataLength={fetchGamesCount}
        hasMore={!!hasNextPage}
        next={fetchNextPage}
        loader={<Spinner />}
      >
        <SimpleGrid
          padding={5}
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={10}
        >
          {Array.from({ length: skeletonCount }, (_, i) => (
            <GameCardContainer key={i}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((game) => (
                <GameCardContainer key={game.id}>
                  <GameCard game={game} />
                </GameCardContainer>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
      {hasNextPage && (
        <Box display="flex" justifyContent="center" marginY={5}>
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </>
  );
}

export default GameGrid;
