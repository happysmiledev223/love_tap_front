import { number } from '@tma.js/sdk';
import { create } from 'zustand'

export const userStore = create((set) => ({
  id: 0,
  username: "",
  points: 0,
  topPick: 0,
  isFirst: true,
  avatar: "",
  votes: [],
  setId: (id) => set({id:id}),
  setavatar: (avatar) => set({avatar:avatar}),
  setUsername: (username) => set({ username: username }),
  setTopPick: (topPick) => set({ topPick: topPick }),
  setPoints: (points) => set({ points: points }),
  setIsFirst: (isFirst) => set({isFirst : isFirst}),
  setVotes: (votes) => set({votes: votes}), 
  addVote: (womenId) => set((state) => {
        const newVotes = [...state.votes];
        if (newVotes[womenId] !== undefined) {
            newVotes[womenId]++;
        }
        return { votes: newVotes };
    })
}))

export const womens = [
    {
        "id": 0,
        "name": "Sophia"
    },
    {
        "id": 1,
        "name": "Amelia"
    },
    {
        "id": 2,
        "name": "Zoe"
    },
    {
        "id": 3,
        "name": "Isabella"
    },
    {
        "id": 4,
        "name": "Olivia"
    },
    {
        "id": 5,
        "name": "Ava"
    },
    {
        "id": 6,
        "name": "Mia"
    },
    {
        "id": 7,
        "name": "Emma"
    },
    {
        "id": 8,
        "name": "Charlotte"
    },
    {
        "id": 9,
        "name": "Luna"
    },
    {
        "id": 10,
        "name": "Harper"
    },
    {
        "id": 11,
        "name": "Evelyn"
    },
    {
        "id": 12,
        "name": "Aria"
    },
    {
        "id": 13,
        "name": "Scarlett"
    },
    {
        "id": 14,
        "name": "Chloe"
    },
    {
        "id": 15,
        "name": "Nora"
    },
    {
        "id": 16,
        "name": "Hazel"
    },
    {
        "id": 17,
        "name": "Penelope"
    },
    {
        "id": 18,
        "name": "Lily"
    },
    {
        "id": 19,
        "name": "Aurora"
    },
    {
        "id": 20,
        "name": "Violet"
    },
    {
        "id": 21,
        "name": "Stella"
    },
    {
        "id": 22,
        "name": "Willow"
    },
    {
        "id": 23,
        "name": "Audrey"
    },
    {
        "id": 24,
        "name": "Savannah"
    },
    {
        "id": 25,
        "name": "Skylar"
    },
    {
        "id": 26,
        "name": "Camila"
    },
    {
        "id": 27,
        "name": "Natalie"
    },
    {
        "id": 28,
        "name": "Eliana"
    },
    {
        "id": 29,
        "name": "Maya"
    },
    {
        "id": 30,
        "name": "Autumn"
    },
    {
        "id": 31,
        "name": "Piper"
    },
  ];

export const selectStore = create((set) => ({
  name: "",
  id: 0,
  src: "",
  setName : (name) => set( { name:name} ),
  setSrc : (src) => set( {src:src} ),
  setId : (id) => set( {id:id} ),
}))
export const gameStore = create((set) => ({
    roundId: 1,
    isPreparing:true,
    endAt: 0,
    matches: [],
    setIsPreparing: (isPrepare) => set({isPreparing: isPrepare}),
    setEndAt: (endAt) => set({endAt : endAt}),
    setRoundId: (roundId) => set({roundId : roundId}),
    setMatches: (matches) => set({matches : matches}),
}))

export const tmpbetStore = create((set) => ({
  player:"",
  playerid: 0,
  betAmount: 1,
  setbetAmount: (betAmount) => set({betAmount : betAmount}),
  setPlayer: (player) => set({player : player}),
  setPlayerId: (playerid) => set({playerid : playerid}),
}))

export const betStore = create((set) => ({
  player:"",
  setPlayer: (player) => set({player : player}),
}))

export const boardStore = create((set) =>({
  bets : [],
  setBet: (bets) => set({bets:bets}),
}))

export const leaderStore = create((set) =>({
    leaders : [],
    setLeaders: (leaders) => set({leaders:leaders} ),
}))

export const resultStore = create((set) =>({
    roundResults: [],
    winner : null,
    addRoundResults: (matches) => set((state) => ({ 
        roundResults: [...state.roundResults, matches] 
    })),
    setWinner: (winner) => set({winner:winner} ),
}))