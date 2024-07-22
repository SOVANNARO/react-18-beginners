### 🟢 Getting Up the Project

`npm create vite@latest`

### 🟢 Installing Chakra UI

`pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion`

### 🟢 Creating a Responsive Layout

`main.tsx`

```typeScript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
```

`App.tsx`

```typeScript
import { Grid, GridItem, Show } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      gridTemplateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav" bg="coral">
        Nav
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bg="gold">
          Aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;

```

### 🟢 Building the Navigation Bar

`src/components/NavBar.tsx`

```typeScript
import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.png";

function NavBar() {
  return (
    <HStack>
      <Image src={logo} boxSize="60px" />
      <Text> NavBar </Text>
    </HStack>
  );
}

export default NavBar;
```

`App.tsx`

```typeScript
import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      gridTemplateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bg="gold">
          Aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
```

### 🟢 Implementing the dark mode

`src/theme.ts`

```typeScript
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({ config });

export default theme;
```

`src/main.tsx`

```typeScript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

```

### 🟢 Building the Color Mode Switch

`src/components/ColorModeSwitch.tsx`

```typeScript
import { HStack, Switch, useColorMode, Text } from "@chakra-ui/react";

function ColorModeSwitch() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      <Text paddingRight="10px">Dark Mode</Text>
    </HStack>
  );
}

export default ColorModeSwitch;
```

`src/components/NavBar.tsx`

```typeScript
import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";

function NavBar() {
  return (
    <HStack justifyContent="space-between">
      <Image src={logo} boxSize="60px" />
      <ColorModeSwitch />
    </HStack>
  );
}

export default NavBar;
```

### 🟢 Fetching the Game

- install axios `npm i axios`

`services/api-client.ts`

```typeScript
import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "86a18ab13e6846b49b71045a59de49e9",
  },
});

```

`components/GameGrid.tsx`

```typeScript
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Game {
  id: number;
  name: string;
}

interface fetchGamesResponse {
  count: number;
  results: Game[];
}

function GameGrid() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient
      .get<fetchGamesResponse>("/games")
      .then((response) => setGames(response.data.results))
      .catch((error) => setError(error));
  });

  return (
    <div>
      {error && <p>Error fetching games: {error}</p>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GameGrid;

```

### 🟢 Create a Custom Hook for fetching Games

`hooks/useGame.tsx`

```typeScript
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Game {
  id: number;
  name: string;
}

interface fetchGamesResponse {
  count: number;
  results: Game[];
}

const useGame = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<fetchGamesResponse>("/games", { signal: controller.signal })
      .then((response) => setGames(response.data.results))
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });

    return () => controller.abort(); // Clean up on unmount to prevent memory leaks
  }, []);
  return { games, error };
};

export default useGame;

```

### 🟢 Building Game Cards

`components/GameCard.tsx`

```typeScript
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { Game } from "../hooks/useGame";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={game.background_image} />
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;

```

### 🟢 Display Platform icons

`npm install react-icons`

`components/PlatformIconList.tsx`

```typeScript
import { HStack, Icon } from "@chakra-ui/react";
import { Platform } from "../hooks/useGame";
import {
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { SiNintendo } from "react-icons/si";
import { MdPhoneIphone } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import { IconType } from "react-icons";

interface Props {
  platform: Platform[];
}

const PlatformIconList = ({ platform }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };

  return (
    <HStack marginY={"10px"}>
      {platform.map((item) => (
        <Icon as={iconMap[item.slug]} />
      ))}
    </HStack>
  );
};

export default PlatformIconList;

```

`components/GameCards.tsx`

```typeScript
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { Game } from "../hooks/useGame";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={game.background_image} />
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
        <PlatformIconList
          platform={game.parent_platforms.map((p) => p.platform)}
        />
      </CardBody>
    </Card>
  );
};

export default GameCard;

```

### 🟢 Displaying Critic Score

`components/CriticScore.tsx`

```typescript
import { Badge } from "@chakra-ui/react";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  const color = score >= 80 ? "green" : score >= 70 ? "yellow" : "";

  return (
    <Badge colorScheme={color} fontSize="14px" paddingX={2} borderRadius="4px">
      {score}
    </Badge>
  );
};

export default CriticScore;
```

### 🟢 Getting Optimized Image

`services/image-url.ts`

```typeScript
const getCroppedImage = (url: string) => {
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImage;
```

### 🟢 Loading Skeletons

`components/GameCardSkeleton.tsx`

```typeScript
import { SimpleGrid } from "@chakra-ui/react";
import useGame from "../hooks/useGame";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

function GameGrid() {
  const { games, error, isLoading } = useGame();
  const skeletonCount = isLoading ? 10 : 0;

  return (
    <div>
      {error && <p>Error fetching games: {error}</p>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
        spacing={10}
        padding={5}
      >
        {Array.from({ length: skeletonCount }, (_, i) => (
          <GameCardSkeleton key={i} />
        ))}
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default GameGrid;

```

### 🟢 Refactor- Removing Duplicated Styles

`components/GameCardContainer.tsx`

```typeScript
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    <Box borderRadius={10} overflow="hidden">
      {children}
    </Box>
  );
};

export default GameCardContainer;

```

### 🟢 Fetching the Genres

`hook/useGenres.ts`

```typeScript
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genres {
  id: number;
  name: string;
}

interface fetchGamesResponse {
  count: number;
  results: Genres[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    apiClient
      .get<fetchGamesResponse>("/genres", { signal: controller.signal })
      .then((response) => {
        setGenres(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
      });

    return () => controller.abort(); // Clean up on unmount to prevent memory leaks
  }, []);
  return { genres, error, isLoading };
};

export default useGenres;

```

`components/GenreList.tsx`

```typeScript
import useGenres from "../hooks/useGenres";

export const GenreList = () => {
  const { genres } = useGenres();

  return (
    <ul>
      {genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
};

```

### 🟢 Creating a Generic Data Fetching Hook

`hooks/useData.ts`

```typeScript
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface fetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    apiClient
      .get<fetchResponse<T>>(endpoint, { signal: controller.signal })
      .then((response) => {
        setData(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
      });

    return () => controller.abort(); // Clean up on unmount to prevent memory leaks
  }, [endpoint]);
  return { data, error, isLoading };
};

export default useData;

```

`hooks/useGame.ts`

```typeScript
import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

const useGame = () => useData<Game>("/games");

export default useGame;

```

`hooks/Genres.ts`

```typeScript
import useData from "./useData";

export interface Genres {
  id: number;
  name: string;
}

const useGenres = () => useData<Genres>("/genres");

export default useGenres;

```

### 🟢 Display the Genres

`components/GenreList.tsx`

```typeScript
import { HStack, List, ListItem, Image, Text } from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImage from "../services/image-url";

export const GenreList = () => {
  const { data } = useGenres();
  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCroppedImage(genre.image_background)}
              alt={genre.name}
            />
            <Text fontSize="lg">{genre.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

```

### 🟢 Showing a Spinner

`components/GenreList.tsx`

```typeScript
import {
  HStack,
  List,
  ListItem,
  Image,
  Text,
  SkeletonText,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImage from "../services/image-url";

export const GenreList = () => {
  const { data, isLoading, error } = useGenres();

  if (error) return null;
  if (isLoading) return <SkeletonText />;

  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCroppedImage(genre.image_background)}
              alt={genre.name}
            />
            <Text fontSize="lg">{genre.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

```

### 🟢 Filtering Games by Genre

`components/GenreList.tsx`

```typeScript
import {
  HStack,
  List,
  ListItem,
  Image,
  SkeletonText,
  Button,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImage from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
}

export const GenreList = ({ onSelectGenre }: Props) => {
  const { data, isLoading, error } = useGenres();

  if (error) return null;
  if (isLoading) return <SkeletonText />;

  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCroppedImage(genre.image_background)}
              alt={genre.name}
            />
            <Button
              onClick={() => onSelectGenre(genre)}
              fontSize="lg"
              variant="text"
            >
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

```

### 🟢 Highlighting the Selected Genre

`components/GenreList.tsx`

```typeScript
import {
  HStack,
  List,
  ListItem,
  Image,
  SkeletonText,
  Button,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImage from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

export const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data, isLoading, error } = useGenres();

  if (error) return null;
  if (isLoading) return <SkeletonText />;

  return (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCroppedImage(genre.image_background)}
              alt={genre.name}
            />
            <Button
              onClick={() => onSelectGenre(genre)}
              fontSize="lg"
              variant="text"
              fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
            >
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

```

### 🟢 Building Platform Selector

`components/PlatformSelector.tsx`

```typeScript
import usePlatForms from "../hooks/usePlatforms";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const PlatformSelector = () => {
  const { data, error } = usePlatForms();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Platforms
      </MenuButton>
      <MenuList>
        {data.map((platform) => (
          <MenuItem key={platform.id}>{platform.name}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;

```

### 🟢 Filtering Games by Platform
