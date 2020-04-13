import {useState} from 'react';
import {createToast} from "../../../../../helper";

export default function Form(props){
    const {video, onPushCaption, onChangeTarget} = props;

    const [text, setText] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const handleChangeText = e => {
        setText(e.target.value);
        onChangeTarget({text: e.target.value, startTime, endTime});
    };

    const handleChangeStartTime = value => {
        setStartTime(value);
        onChangeTarget({startTime: value, endTime, text})
    }

    const handleChangeEndTime = value => {
        setEndTime(value);
        onChangeTarget({endTime: value, startTime, text});
    };

    return  <>
                <div className="input-line d-flex flex-wrap align-items-start">
                    <div className="col-sm-12 col-md-6 form-group">
                        <label>자막</label>
                        <input 
                            type="text" 
                            value={text} 
                            onChange={handleChangeText} 
                        />
                    </div>
                    <div className="col-sm-12 col-md-3 form-group">
                        <label>시작 시간</label>
                        <div className="d-flex">
                            <input 
                                type="number" 
                                value={startTime} 
                                min="0" 
                                onChange={e => handleChangeStartTime(e.target.value)} 
                                step="0.5" 
                            />
                            <button 
                                className="fill-btn" 
                                onClick={() => handleChangeStartTime( video.current.currentTime.toFixed(2) )}
                            >
                                <i className="far fa-clock"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3 form-group">
                        <label>종료 시간</label>
                        <div className="d-flex">
                            <input 
                                type="number" 
                                value={endTime} 
                                min="0" 
                                onChange={e => handleChangeEndTime(e.target.value)} 
                            />
                            <button 
                                className="fill-btn" 
                                onClick={() => handleChangeEndTime( video.current.currentTime.toFixed(2) )}
                            >
                                <i className="far fa-clock"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-12 mt-4">
                        <div className="d-flex">
                            <button 
                                className="underline-btn mr-3" 
                                onClick={() => onPushCaption({startTime, endTime, text})}
                            >
                                적용하기
                            </button>
                            <button className="underline-btn">
                                결정하기
                            </button>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    input:not([type='files']):not(.range), textarea {
                        display: block;
                        border: 1px solid #ddd;
                        padding: 0.7em 0.8em;
                        font-size: 0.85em;
                        outline: none;
                        background-color: #fff;
                        width: calc(100% - 40px);
                    }

                    .fill-btn {
                        width: 40px;
                        height: 40px;
                    }
                
                `}</style>
            </>
}