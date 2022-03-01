import React, { useState, useEffect, useRef } from "react";
import { Button, Heading, Text, Center, Stack, Box } from "@chakra-ui/react";
import {
    combineAll,
    combineLatestAll,
    fromEvent,
    interval,
    map,
    of,
    scan,
    take,
    tap,
    throttleTime,
} from "rxjs";
import produce from "immer";

const RxJsDemoComponent: React.FC = (props) => {
    const [count, setCount] = useState(0);
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const btn = btnRef.current;
        if (btn) {
            fromEvent(btn, "click").subscribe(() => console.log("click"));
        }
    }, []);

    useEffect(() => {
        if (btnRef.current) {
            fromEvent(btnRef.current, "click").subscribe(() => {
                setCount(count + 1);
            });
        }
    }, [count]);

    useEffect(() => {
        if (btnRef.current) {
            fromEvent(btnRef.current, "click")
                .pipe(scan((count) => count + 1, 0))
                .subscribe((count) => console.log(count));
        }
    }, []);

    useEffect(() => {
        if (btnRef.current) {
            fromEvent(btnRef.current, "click")
                .pipe(
                    throttleTime(1000),
                    scan((count) => count + 1, 0)
                )
                .subscribe((count) => console.log(count));
        }
    }, []);

    useEffect(() => {
        // combineLatest
        const source$ = interval(1000).pipe(take(2));
        source$.subscribe((x) => console.log(x));
        const example$ = source$.pipe(
            map((val) =>
                interval(1000).pipe(
                    map((i) => `Result (${val}) : ${i}`),
                    take(3)
                )
            )
        );
        example$.pipe(combineLatestAll()).subscribe((val) => console.log(val));
    }, []);

    const [takeDemo, setTakeDemo] = useState(0);
    useEffect(() => {
        // take
        if (btnRef.current) {
            fromEvent(btnRef.current, "click")
                .pipe(
                    take(1),
                    tap(
                        // transparently perform actions
                        () => setTakeDemo(takeDemo + 1)
                    )
                )
                .subscribe();
        }
    }, []);
    return (
        <Stack>
            <Heading>RxJsDemoComponent</Heading>

            <Box maxW="sm" borderWidth={1} borderRadius="lg" padding={8}>
                <Text>Click count: {count}</Text>
                <Text>Only take once: {takeDemo}</Text>
                <Stack>
                    <Button ref={btnRef}>Click</Button>
                </Stack>
            </Box>
        </Stack>
    );
};

export default RxJsDemoComponent;
