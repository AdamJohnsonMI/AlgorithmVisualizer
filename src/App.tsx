
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useRef, useState } from "react";
import TestSort from './Components/TestSort'



export interface IMyData {
  num: number
}

export default function App() {
  const numberData: IMyData[] = [
    {
      num: 2400
    },
    {
      num: 1398
    }
  ]
  const [data, setData] = useState(numberData)
  const [numbers, setNumbers] = useState<string>()
  const textRef = useRef<HTMLInputElement>(null)
  const [selected, setSelected]   = useState<number>(1)
  const [sorted, setSorted]   = useState<number>(0)


  function getNumber(){
    let newNumber = textRef.current?.value
    if (textRef.current?.value){
      let userNumber = textRef.current?.value
      setNumbers(userNumber)
    }    
    let x = SetGraph(newNumber);
    setData(x);
    setSorted(0);
    setSelected(1);
  }

  function SetGraph(newNumber:any){

    let newArray: IMyData[] = []
    for(let i =0; i< parseInt(newNumber); i++){
      newArray[i] = {num: Math.floor(Math.random() * 201)}
    }
    return newArray
  }

  async function sortGraph(arr:IMyData[]){
    console.log("Shouldnt see this")
    //const copy = SelectionSort(arr)
    setData(await SelectionSort(arr)); 
  }

  function swap(arr:number[], x:number, y:number){
    let temp:any = arr[x]
    arr[x] = arr[y]
    arr[y] = temp
  }

  const delay = (ms: number | undefined) => new Promise((resolve, reject) => setTimeout(resolve, ms));

  async function SelectionSort(arr:IMyData[]): Promise<IMyData[]>{
      let n = arr.length
      
      for(let i = 0; i < n; i++){
        let min = i;
        //setSelected(i)
        
        for(let j = i + 1; j < n; j++){
          await delay(1);
          setSelected(j)
          if (arr[j].num < arr[min].num){
            min = j;
          }
        }
        if( min != i){
            let temp = arr[i].num
            arr[i].num = arr[min].num
            arr[min].num = temp
            setSorted(i)
          }
      }
      console.log("New Array")
      console.log(arr)
      return arr
    }
 

  function checkColor(index:number){
    if(data[index]===data[selected]){
      return '#290a0a'
    } else if(data[index]===data[sorted]){
      return '#ff3333'
    }
    else {
      return '#005599'
    }
  }
  return (
    <>
    <div> How Many Numbers?
   <input ref={textRef} type="text"></input> <input type="button" value="Click Here" onClick={getNumber}></input>
   <button onClick={() => SelectionSort(data)} >Start Selection Sort</button>  
   <button onClick={() => sortGraph(data)} >Start Bubble Sort</button>
   <button onClick={() => sortGraph(data)} >Start Insertion Sort</button>
   <button onClick={() => sortGraph(data)} >Start Merge Sort</button>
   <button onClick={() => sortGraph(data)} >Start Quick Sort</button>
   <button onClick={() => sortGraph(data)} >Start Heap Sort</button>
   </div>
    

  <BarChart width={730} height={250} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="num" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="num" > {
      data.map((entry, index) => (
        <Cell fill= {checkColor(index)}/>
      ))
    }</Bar>
  </BarChart>
  </>
  );
}
