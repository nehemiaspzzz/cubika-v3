"use client";
import { useState, useEffect } from "react";

interface CounterProps {
    end: number;
    duration?: number; // duración en segundos
}

export const Counter = ({ end, duration = 2 }: CounterProps) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!started) {
            setStarted(true);
            setCount(0);
            return;
        }

        if (count >= end) {
            return;
        }

        // Calculamos el intervalo basado en la duración deseada
        const steps = end;
        const intervalTime = (duration * 800) / steps;

        const timer = setTimeout(() => {
            setCount(prev => Math.min(prev + 1, end));
        }, intervalTime);

        return () => clearTimeout(timer);
    }, [count, end, started, duration]);

    return <span>+{count}</span>;
};
