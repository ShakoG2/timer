import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Card, Container} from "react-bootstrap";
import card from './Timer.css'
import {clear} from "@testing-library/user-event/dist/clear";


const Timer = () => {
    const [second, setSecond] = useState(0);
    const [time, setTime] = useState("00:00:00");
    const [stopTimer, setStopTimer] = useState(true);
    const [buttonText, setButtonText] = useState("Start");
    const [step, setStep] = useState();
    const [history, setHistory] = useState([]);

    const start = () => {
        if (!step) return;
        if (stopTimer)
            setSecond((second) => second + 1)
        setStopTimer(!stopTimer);
        if (!stopTimer) {
            if (history.length === 2)
                history.pop();
            setHistory((history) => [time + ' ' + (step === 100 ? 'milliSeconds' : 'Seconds'), ...history]);
        }
        setButtonText(stopTimer ? "Stop" : "Start")
    }

    const convertMinutesToTime = (x) => {
        return new Date(x * 1000).toISOString().substr(11, 8)
    }

    const setMin = () => {
        setStep(1000)
    }

    const setSec = () => {
        setStep(100)
    }

    const reset = () => {
        setStep(0);
        setSecond(0);
        setStopTimer(true);
        setButtonText("Start");
    }

    const resetHistory = () => {
        setHistory([]);
    }

    const addMinute = () => {
        if (!stopTimer && step !== null) {
            setTimeout(() => {
                setSecond((sec) => sec !== 0 ? sec + 1 : 0);
            }, step);
        }
    }


    useEffect(() => {
        setTime(convertMinutesToTime(second));
        addMinute();
        // return () => {
        //    return  clearInterval(addMinute());
        // }
    }, [second]);

    return (
        <Container fluid={"xxl"} className="d-flex justify-content-center">
            <Card className={card}>
                <Card.Header>
                    <ButtonGroup aria-label="Basic example" className="d-flex justify-content-between">
                        <Button className={step === 1000 ? 'disabled' : ''} variant="dark"
                                onClick={setSec}>MilliSeconds</Button>
                        <Button className={step === 100 ? 'disabled' : ''} variant="dark"
                                onClick={setMin}>Seconds</Button>
                    </ButtonGroup>
                </Card.Header>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-center text-white">Timer</Card.Title>
                    <Card.Text className="d-flex justify-content-center text-white display-2">
                        {time}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <ButtonGroup aria-label="Basic example" className="d-flex">
                        <Button variant="dark" onClick={reset}>Reset</Button>
                        <Button variant="dark" onClick={start}>{buttonText}</Button>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
            <Card className={card}>
                <Card.Header>
                    <ButtonGroup aria-label="Basic example" className="d-flex justify-content-between">
                        <Button variant="dark" onClick={resetHistory}>Reset</Button>
                    </ButtonGroup>
                </Card.Header>
                <Card.Title className="d-flex justify-content-center text-white">
                    History
                </Card.Title>
                <Card.Body>
                    <ul className="list-group bg-dark">
                        {history.map((history, index) => <li key={index}
                                                             className="list-group-item bg-dark text-white ">{history}</li>)}
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Timer;