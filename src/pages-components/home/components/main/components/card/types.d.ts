export type Props = {
    matchTitle:string
    firstUser:{
        name:string
        id:number
    },
    secondUser:{
        name:string
        id:number
    }
    winuser:{
        name:string
        image:string
    },
    point: number
    type: number
}