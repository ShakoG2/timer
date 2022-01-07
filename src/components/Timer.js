import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Card, Container} from "react-bootstrap";
import card from './Timer.css'


const Timer = () => {
    const [second, setSecond] = useState(0);
    const [time, setTime] = useState("00:00:00");
    const [stopTimer, setStopTimer] = useState(true);
    const [buttonText, setButtonText] = useState("Start");
    const [step, setStep] = useState();

    const start = () => {
        if (!step) return;
        setSecond((second) => second + 1)
        setStopTimer(!stopTimer);
        setButtonText(stopTimer ? "Stop" : "Start")
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

    useEffect(() => {
        setTime(new Date(second * 1000).toISOString().substr(11, 8));
        if (!stopTimer && step !== null) {
            setTimeout(() => {
                setSecond((sec) => sec !== 0 ? sec + 1 : 0);
            }, step);
        }
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
        </Container>
    )
}

export default Timer;