import React, { useEffect, useState } from 'react'

const Setting = () => {
    const [category ,setCategory] = useState([])
    const [selectedcategory ,setSelectedcategory] =useState('')
    const [questions ,setQuestions] = useState([])
    const [questionnumbers ,setQuestionnumbers] = useState(10)
    const [difficulty ,setDifficulty] = useState('easy')
    const [answer, setAnswer] =useState([])
    const [showresult, setShowresult] = useState(false)

    useEffect(()=>{
        fetch('https://opentdb.com/api_category.php')
        .then((response)=>response.json())
        .then((data)=>{
            setCategory(data.trivia_categories)
        })
    },[])


    function StartQuiz(){
        fetch(`https://opentdb.com/api.php?amount=${questionnumbers}&category=${selectedcategory}&difficulty=${difficulty}&type=multiple`)
        .then((response)=>response.json())
        .then((data)=>{
            setQuestions(data.results)
            setShowresult(false)
            setAnswer(new Array(data.results.length).fill(''))
        })
    }
    function HandleAnswer(item,i){
        let update =[...answer]
        update[i]=item
        setAnswer(update)
    }
    function showresults(){
        setShowresult(true)
    }

  return (
    <>
    <h1 style={{color: 'rgb(53, 111, 113)'}}>QUIZ APP</h1>
    <label>
        <h2 style={{color: 'cadetblue'}}>SELECT CATEGORY</h2>
        <select 
        value={selectedcategory} 
        onChange={(e)=>setSelectedcategory(e.target.value)} 
        name="" id="">
            <option value="">Any Category</option>
            {category.map((item)=>{
                return(<option value={item.id}>{item.name}</option>)
            })}
        </select>
    </label>
    <div>
        <h2 style={{color: 'cadetblue'}}>SELECT NUMBER OF QUESTIONS</h2>
        <input type="number" value={questionnumbers} onChange={(e)=>setQuestionnumbers(e.target.value)} />
    </div>
    <label>
        <h2 style={{color: 'cadetblue'}}>SELECT LEVEL</h2>
        <select value={difficulty} onChange={(e)=>setDifficulty(e.target.value)} name="" id="">
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
        </select>
    </label>
    <button onClick={StartQuiz}>Start Quiz</button>
    <button onClick={showresults}>Show result</button>
    {questions.map((item, i)=>{
        let allanswer = [...item.incorrect_answers,item.correct_answer]
        return(
            <div className='ques-div' style={{border: '2px solid'}}>
            <h3>{item.question}</h3>
            {allanswer.map((ele)=>{
                // console.log(ele);
                return(
                    <div>
                        <input 
                        type="radio"
                        value={ele} 
                        onChange={()=>HandleAnswer(ele,i)}
                        checked={answer[i]===ele}/>
                        {ele}
                    </div>
                )
            })}
            
        {showresult?
        questions.map((item,i)=>{
            return(
                <>
          <h3>Your Question:{item.question}</h3>
          <h3>Your Answer:{answer[i]}</h3>
          <h3>Correct answer:{item.correct_answer}</h3>
          </>
        )
    })
    :null}
            </div>
        )
    })}
    

    </>
  )
}

export default Setting