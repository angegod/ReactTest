import React,{useState,useEffect} from 'react';
//import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App2.css';

const GuessNumber=({setEnable,listColors})=>{
    //setEnable是傳輸變數之一，對於子物件來說，true則代表可以輸入數值，當五個數值輸入完畢之後，就會將子物件的按鈕遮蔽。父物件的按鈕打開
    const [GuessCount,setGuessCount]=useState(1);//表示目前正在輸入第幾次
    const [InputNum,setInputNum]=useState(0);
    const [NumArr,setNumArr]=useState([]);//輸入完畢的陣列
    const [childEnable,setChildEnable]=useState(true);
    
    

    var placeholder='Input number'+GuessCount+' here!';

    if(childEnable===false&&GuessCount===6){
        placeholder='The End';
    }

    
    
    useEffect(()=>{

    },[]);

    const GuessNumberList=NumArr.map((num,i)=>{
        return <li key={i} className={
            (listColors[i]===1) ? 'green'
         : (listColors[i]===0) ? 'red'
         : 'white'
        }>{num}</li>
    });

    function handleClick(){
        if(InputNum>100||InputNum<1){
            alert('You must enter the number between 1 and 100');
        }
        else if(GuessCount<=5){//前五次會把輸入的值丟進一個陣列裡面
            //setNumArr(arr=>[...arr,parseInt(InputNum)]);
            NumArr.push(parseInt(InputNum));
            setInputNum(0);
            document.getElementById('number').value='';
            setGuessCount(count=>count+=1);
        }
        //console.log(GuessCount);
        if(GuessCount===5){//當第六次斷掉
            setEnable([true,NumArr]);
            setChildEnable(false);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleClick();
        }
    }

    function Reset(){//重置
        setGuessCount(1);
        setEnable(false);
        setChildEnable(true);
        setInputNum(0);
        setNumArr([]);
    }

    return (
        <><div className='guess'>
            <input type='number' id="number" placeholder={placeholder} onChange={e=>setInputNum(e.target.value)} onKeyDown={handleKeyDown} disabled={!childEnable}/>
            <Button variant='primary'  onClick={handleClick} disabled={!childEnable}>Add Guess!</Button>
            <Button variant='primary' onClick={Reset} disabled={childEnable}>Reset</Button><br/>
            <ul>{GuessNumberList}</ul>
            
        </div></>
    )



}

export default GuessNumber;