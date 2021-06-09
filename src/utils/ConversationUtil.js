
export class ConversationUtil {

    static getTimeAsNumber(time){
        return +time.slice(0,-1);
    }

    static isTranscriptActive(currentTime,person){
        const startTime = ConversationUtil.getTimeAsNumber(person[0].startTime);
        const endTime = ConversationUtil.getTimeAsNumber(person[person.length-1].endTime);
        return currentTime >= startTime && currentTime < endTime
    }

    static isWordActive(currentTime,wordInfo){
        const startTime = ConversationUtil.getTimeAsNumber(wordInfo.startTime)
        const endTime = ConversationUtil.getTimeAsNumber(wordInfo.endTime)
        return currentTime >= startTime && currentTime < endTime
    }

    static getTimeDifferenceOfSentence(sentence){
        const startTime = sentence[0].startTime;
        const endTime = sentence[sentence.length-1].endTime;
        const t1 = this.getTimeAsNumber(startTime);
        const t2 = this.getTimeAsNumber(endTime);
        return t2-t1;
    }
    static getStartAndEndTimeOfSentence(sentence){
        const startTime = sentence[0].startTime;
        const endTime = sentence[sentence.length-1].endTime;
        const t1 = this.getTimeAsNumber(startTime);
        const t2 = this.getTimeAsNumber(endTime);
        return [t1,t2];
    }

    static getTimeDifference(startTime,endTime){
        const t1 = this.getTimeAsNumber(startTime);
        const t2 = this.getTimeAsNumber(endTime);
        return t2-t1;
    }

    static getRespectivePercentageOfUserConversation(wordTiming){
        if(!wordTiming.length){
            return [0,0];
        }
        let user2time  = 0;
        let user1time =  0;
        let totalTime = 0;

        for(let i=0;i<wordTiming.length;i=i+2){
            const sentence = wordTiming[i];
            const timeDiff = this.getTimeDifferenceOfSentence(sentence);
            user2time += timeDiff;
            totalTime += timeDiff;
        }

        for(let i=1;i<wordTiming.length;i=i+2){
            const sentence = wordTiming[i];
            const timeDiff = this.getTimeDifferenceOfSentence(sentence);
            user1time += timeDiff;
            totalTime += timeDiff;
        }

        const user2percentage = (user2time/totalTime)*100;
        const user1percentage = (user1time/totalTime)*100;
        return [Math.round(user1percentage),Math.round(user2percentage)];
    }

    static zeroPad = (number, size = 2) => {
        let s = String(number);
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    };

    static formatTime(t){
        let time = t;
        if(typeof time=== 'string'&&time.includes('s')){
           time = this.getTimeAsNumber(time);
        }
        time = ''+time.toFixed(2);
        let [sec,msec] = time.split('.');
        sec = this.zeroPad(sec);
        return sec+'.'+(msec?msec:'00');
    }

    static getMinMaxBarUsingWidth(width,duration){
        const value = duration/width*10
        return {
            min:value-0.1<0||0.1,
            max:value
        }
    }

    static getBarsInfoUsingWordTimings(wordTiming,duration){
        let {min,max} = this.getMinMaxBarUsingWidth(window.innerWidth,duration);
        let minTime=10000;

        wordTiming.forEach((sentence)=>{
            const timeDiff = this.getTimeDifferenceOfSentence(sentence);
            if(timeDiff<minTime){
                minTime = timeDiff;
            }
        })

        if(minTime<min) minTime= min;
        if(minTime>max) minTime = max;
        minTime=minTime.toFixed(1);
        const totalBars = Math.round(duration/minTime);

        return [minTime,totalBars];
    }
    static isUserAtIndex(sentenceIndex,wordTimings,indexDuration){

        if(!wordTimings[sentenceIndex]){
            return [null,false];
        }
        const [startTime,endTime] = this.getStartAndEndTimeOfSentence(wordTimings[sentenceIndex]);

        if(startTime<=indexDuration&&endTime>=indexDuration){
            return [sentenceIndex,true];
        }
        if(indexDuration<endTime){
            return [sentenceIndex,false];
        }else{
            const [newIndex,isUser] = this.isUserAtIndex(sentenceIndex+1,wordTimings,indexDuration);
            return [newIndex,isUser];
        }
    }

    static getClasses(sentenceIndex,isUser,alreadyRed){
            if(!isUser){
                return {
                    user1:'single-bar-transparent',
                    user2:'single-bar-transparent',
                }
            }
            let user = sentenceIndex%2 !== 0; //true user1 | false user2
            if(user){
                return {
                    user1:alreadyRed?'single-bar-fade':'single-bar-purple',
                    user2:'single-bar-transparent'
                }
            }else{
                return {
                    user1:'single-bar-transparent',
                    user2:alreadyRed?'single-bar-fade':'single-bar-blue'
                }
            }
    }

    static skipAudioBySec(direction,currentTime,duration,skip=10){
        if(direction===-1){
            const skipPart = currentTime - skip;
            return skipPart > 0 ? skipPart:0;
        }else if(direction===1){
            const skipPart = duration-currentTime;
            return skipPart>10?currentTime+10:duration;
        }
    }

    // static isUserAtIndex(sentenceIndex,wordTimings,indexDuration){
    //     // console.log(wordTimings,wordTimings[sentenceIndex],sentenceIndex)
    //     if(!wordTimings[sentenceIndex]){
    //         return [null,false];
    //     }
    //     const [startTime,endTime] = this.getStartAndEndTimeOfSentence(wordTimings[sentenceIndex]);
    //     // console.log(startTime,indexDuration,endTime);
    //     if(startTime<=indexDuration&&endTime>=indexDuration){
    //         console.log('-----------------------')
    //         return [sentenceIndex,true];
    //     }
    //     if(indexDuration<endTime){
    //         console.log('--------')
    //         return [sentenceIndex,false];
    //     }else{
    //         const [newIndex,isUser] = this.isUserAtIndex(sentenceIndex+2,wordTimings,indexDuration);
    //         return [newIndex,isUser];
    //     }
    // }
}