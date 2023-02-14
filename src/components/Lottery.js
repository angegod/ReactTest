import React,{useState,useEffect} from 'react';
//import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App2.css';
import GuessNumber from './GuessNumber';

export default function Lottery(){
    const [RandomNumber,setRandomNumber]=useState(0);
    const [RandomNumber2,setRandomNumber2]=useState(0);
    const [RandomNumber3,setRandomNumber3]=useState(0);
    const [RandomNumber4,setRandomNumber4]=useState(0);
    const [RandomNumber5,setRandomNumber5]=useState(0);
    const [Enable,setEnable]=useState([]);//直接將兩個參數包在一起[可不可以隨機數字及輸入完畢數字的陣列]
    //const [PlayerGuess,setPlayerGuess]=useState([]);
    const [btnText,setBtnText]=useState('Start');
    const [correctArr,setCorrectArr]=useState([]);
    //const [AnsArr,setAnsArr]=useState([]);
    const [correctTimes,setCorrectTimes]=useState(0);
    const [colors,setColors]=useState([]);



    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

   
    const handleClick =async event => {
        var num1=0,num2=0,num3=0,num4=0,num5=0;
            setBtnText('Processing');
            setCorrectTimes(0);
            setColors([]);
            for(var i=1;i<=50;i++){
                num1=Math.ceil(Math.random()*10);
                num2=Math.ceil(Math.random()*10);
                num3=Math.ceil(Math.random()*10);
                num4=Math.ceil(Math.random()*10);
                num5=Math.ceil(Math.random()*10);

                setRandomNumber(num1);
                setRandomNumber2(num2);
                setRandomNumber3(num3);
                setRandomNumber4(num4);
                setRandomNumber5(num5);
                //console.log(RandomNumber2);
                await delay(40);
            }
            var array=[];
            array.length=5;
            array[0]=num1;array[1]=num2;array[2]=num3;array[3]=num4;array[4]=num5;
            //console.log(array);
            setCorrectArr(array);
            setBtnText('Start');
            
            //console.log(correctArr);
            if(Enable[0]&&array!==[]){
                for(var j=0;j<Enable[1].length;j++){
                    if(array.includes(Enable[1][j])){
                        //console.log(array[j]);
                        setCorrectTimes(c=>c+=1);
                        setColors(oldarray=>[...oldarray,1]);        
                    }else{
                        setColors(oldarray=>[...oldarray,0]);  
                    }
                    // array2[j]=Enable[1].includes(array[j]);
                }
            }
            
    };    

    useEffect(()=>{
        if(!Enable){
            setCorrectTimes(0);
            setColors([]);
            setCorrectArr([]);
            setRandomNumber(0);
            setRandomNumber2(0);
            setRandomNumber3(0);
            setRandomNumber4(0);
            setRandomNumber5(0);
            setEnable([]);//避免重複執行
        }
        

       //setInputNum(0);
    },[Enable,setColors,setCorrectArr,setRandomNumber,setRandomNumber2,setRandomNumber3,setRandomNumber4,setRandomNumber5,correctArr]);

    function RandomNumButton(){
        var style='primary';

        if(btnText!=='Start')
            style='warning';
        return(<Button variant={style} onClick={handleClick} disabled={style==='warning'||!Enable[0]}>{btnText}</Button>)
    }

    

    



    return(
        <><div>
            <label>{RandomNumber}</label>
            <label>{RandomNumber2}</label>
            <label>{RandomNumber3}</label>
            <label>{RandomNumber4}</label>
            <label>{RandomNumber5}</label><br />
            <RandomNumButton></RandomNumButton><br/>
            <label>Correct Times:{correctTimes}</label>
        </div><hr />
        <GuessNumber setEnable={setEnable} listColors={colors}/>
       
        
    
        </>

        
    )
}

