import React, { useState,useEffect } from 'react'
import './GuidedSelectorTSX.css'

const GuidedSelectorTSX = (props: object) => {
  const stepsNumber: number = 3;//number of total steps
  const [getStep, setStep] = useState<number>(1)//1 for default step
  const data: { [key: number]: string } = { //input data/example object with data to show
    1: "step 1 Content",
    2: "step 2 Content",
    3: "step 3 Content",
  }

  ////////////////////////////////////////////items to show by step
  useEffect(() => { //to show first step at a first render
    showStep()
  }, [])
  const showStep = () => { //this function return items to show
    // console.log(data[getStep]);
    return (<div className='h-full w-full text-center text-8xl'>{data[getStep]}</div>)//we can return a label, component, or another item 
  }

  ////////////////////////////////////////////Buttons
  const next = () => {
    if (getStep < stepsNumber) {
      setStep(getStep + 1)
      // console.log('step', getStep);
    }
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
        <button className={`step-button ${getStep == 1 ? 'current-step-button' : ''}`} onClick={()=>setStep(1)}>1 <br /> Step </button>
        <button className={`step-button ${getStep == 2 ? 'current-step-button' : ''}`} onClick={()=>setStep(2)}>2 <br /> Step </button>
        <button className={`step-button ${getStep == 3 ? 'current-step-button' : ''}`} onClick={()=>setStep(3)}>3 <br /> Step </button>
      </div>
      <div className="right-0  col-start-2"  >
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

export default GuidedSelectorTSX



