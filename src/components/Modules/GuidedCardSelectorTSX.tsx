import React, { useState, useEffect } from 'react'
import './GuidedCardSelectorTSX.css'
import type { array } from 'astro/zod';

interface Item {//this object interface describe object expected values types
    id?: number;
    title: string;
    image: string;
    price: number;
    compatibeWith: string[]
    compatibleNew:string[]
}
let selectedProdcuts: {[key: number]: Item}={};//here we store prodcuts selected by user
let compatibleList: string[]=[];



const GuidedCardSelectorTSX = (props: object) => {
    const stepsNumber: number = 3;//number of total steps
    const [getStep, setStep] = useState<number>(1)//1 for default step
    let porductsPrices: string;//

    const data: { [key: number]: Item[] } = { //input data/example object with data to show
        1: [
            {
                id: 21,
                title: 'Cat',
                image: 'https://pngimg.com/uploads/cat/cat_PNG50521.png',
                price: 0,
                compatibeWith: [],
                compatibleNew:['cat']
            },
            {
                title: 'Dog',
                image: 'https://pngimg.com/uploads/dog/dog_PNG2453.png',
                price: 0,
                compatibeWith: [],
                compatibleNew:['dog']
            }, 
        ],
        2: [
            {
                title: 'Cat collar 1',
                image: 'https://pngimg.com/uploads/dog_collar/dog_collar_PNG1.png',
                price: 2.56,
                compatibeWith: ['cat'],
                compatibleNew:['tucan']
            },
            {
                title: 'Cat collar 2',
                image: 'https://www.pngarts.com/files/3/Dog-Collar-PNG-Photo.png',
                price: 2.56,
                compatibeWith: ['cat'],
                compatibleNew:[]
            },
            {
                title: 'Dog collar 1',
                image: 'https://www.pngarts.com/files/3/Dog-Collar-PNG-Photo.png',
                price: 2.56,
                compatibeWith: ['dog'],
                compatibleNew:[]
            },
            {
                title: 'Cat collar 2',
                image: 'https://pngimg.com/uploads/dog_collar/dog_collar_PNG1.png',
                price: 2.56,
                compatibeWith: ['dog'],
                compatibleNew:[]
            },
        ],
        3: [
            {
                title: 'Cat food 1',
                image: 'https://www.purina-arabia.com/sites/default/files/2022-05/Friskies%20Indoor%20Delights%20Dry%20Cat%20Food.jpg',
                price: 2.56,
                compatibeWith: ['cat'],
                compatibleNew:[]
            },
            {
                title: 'Cat food 2',
                image: 'https://i5.walmartimages.com/asr/2b8b49cc-8c5c-4dbf-877e-94d1c15f1947_2.45db701af657eb225320583ae61e6801.jpeg',
                price: 2.56,
                compatibeWith: ['cat'],
                compatibleNew:[]
            },
            {
                title: 'Dog food 1',
                image: 'https://nypost.com/wp-content/uploads/sites/2/2022/10/151814_MAIN._AC_SL1200_V16624783.jpg',
                price: 2.56,
                compatibeWith: ['dog'],
                compatibleNew:[]
            },
            {
                title: 'Dog food 2',
                image: 'https://inthekibble.com/wp-content/uploads/dog-foods/packages/royal-canin-boxer-puppy-dry-dog-food-1024x1024.jpg',
                price: 2.56,
                compatibeWith: ['dog'],
                compatibleNew:[]
            },
        ],
    }
    

    ////////////////////////////////////////////items to show by step
    useEffect(() => { //to show first step at a first render
        showStep()
    }, [])
    const showStep = () => { //this function return items to show
        
        //here we haver to generate a new fetch request whith a antry parameters  
        // const request=(compatibleList:Array<string>,)=>{//fake request
        //     return 
        // }
        

        // console.log(data[getStep]);
        // return (<div className='h-full w-full text-center text-8xl'>{data[getStep]}</div>)//we can return a label, component, or another item 

        return (
            <div className='w-full  flex  flex-wrap'>
                {data[getStep].map((item,index)=>
                    <button onClick={()=>card(item)} key={index} className='border-2 border-gray-500 bg-white rounded-lg m-2 w-48 flex flex-col h-min py-1 '>
                        <img className="h-48 object-scale-down" src={item.image}></img>
                        <h2>{item.title}</h2>
                        <p className='text-green-700'>{(item.price !==0)?`$${item.price}`:""}</p>
                    </button>
                )}
            </div>
        )
    }

    ////////////////////////////////////////////Buttons
    const card=(item:Item)=>{ //Item is the variable we declare UP

         selectedProdcuts[getStep]=item//if in slectedProducts getStep contains a object    

        compatibleList =[ //we add new compatible string to filter the next item
            ...compatibleList, 
            ...selectedProdcuts[getStep].compatibleNew.map((item) => {
            return item;
            })
        ];


        console.log('compatibleList',compatibleList)
        console.log('selectedProdcuts',selectedProdcuts)

        return next()
    }

    const next = () => {
        if (getStep < stepsNumber) {
              setStep(getStep + 1)
        }
        console.log(getStep )
    }
    const previous = () => {
        if (getStep > 1) {
            setStep(getStep - 1)
            // console.log('step', getStep);
        }
    }
    const reset = () => {
        setStep(1)

    }


    return (
        <section className="font-quicksand font-bold relative bg-gray-200 h-[800px] w-[800px] mx-auto rounded-lg text-gray-700 grid grid-cols-[150px,auto]">
            <div className="">
                <button className={`step-button ${getStep == 1 ? 'current-step-button' : ''}`}>1 <br /> Step </button>
                <button className={`step-button ${getStep == 2 ? 'current-step-button' : ''}`}>2 <br /> Step </button>
                <button className={`step-button ${getStep == 3 ? 'current-step-button' : ''}`}>3 <br /> Step </button>
            </div>
            <div className="right-0  col-start-2 "  >
                {
                    showStep()
                }
            </div>
            <div className="w-full absolute bottom-0 flex flex-2 ">
                <span className=" text-2xl border-4 border-gray-500 rounded-lg min-w-[200px] ">Total: $453.25</span>
                <div className="flex w-full  justify-around">
                    <button onClick={() => { reset() }} className="common-button  bg-gray-600 mr-12 ">
                        <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480.28-46.67q-80.95 0-151.95-30.33-71-30.33-123.99-83.17-52.99-52.84-83.17-123.5Q91-354.33 91-435.33h104.67q0 118.65 82.84 200.99Q361.36-152 479.88-152q118.11 0 200.78-82.69 82.67-82.68 82.67-200.98 0-118.65-80.96-200.99Q601.4-719 482.33-719h-17.66l62.66 62.67L471.67-600 299-773.33 471.67-946l55.66 56.67-65.66 65H479q81.31 0 152.32 30.33 71.01 30.33 124.01 83.17 53 52.83 83.34 123.46Q869-516.74 869-435.87t-30.19 151.8q-30.18 70.92-83.2 123.96-53.01 53.04-123.7 83.24-70.69 30.2-151.63 30.2Z" /></svg>
                        &nbsp;Reset
                    </button>
                    <button onClick={() => { previous() }} className="common-button bg-gray-600">
                        <svg height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed"><path d="M560.67-213.33 293.33-480.67 560.67-748l74 74-193.34 193.33 193.34 193.34-74 74Z" /></svg>
                        Previous
                    </button>
                    <button onClick={() => { next() }} className="common-button  bg-green-600 border-4 ">
                        Next
                        <svg height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed"><path d="M494.67-480.67 301.33-674l74-74 267.34 267.33-267.34 267.34-74-74 193.34-193.34Z" /></svg>
                    </button>
                </div>

            </div>
        </section>
    )
}

export default GuidedCardSelectorTSX



