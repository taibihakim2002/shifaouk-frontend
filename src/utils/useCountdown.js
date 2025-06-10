import { useEffect, useState } from "react";

function useCountdown(targetDate) {
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if (!targetDate) return;

        const target = new Date(targetDate).getTime();
        const updateRemaining = () => {
            const now = Date.now();
            const diff = Math.max(Math.floor((target - now) / 1000), 0);
            setRemainingTime(diff);
        };

        updateRemaining(); // Call once immediately

        const interval = setInterval(() => {
            updateRemaining();
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    const formatted = isNaN(hours)
        ? "--:--:--"
        : `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return { remainingTime, formatted };
}

export default useCountdown;