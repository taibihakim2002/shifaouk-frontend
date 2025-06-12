import { useEffect, useState } from "react";

function useCountdown(targetDate, durationInMinutes = 0) {
    const [remainingTime, setRemainingTime] = useState(0);
    const [status, setStatus] = useState("upcoming");

    useEffect(() => {
        if (!targetDate) return;

        const target = new Date(targetDate).getTime();
        const endTime = target + durationInMinutes * 60 * 1000;

        const updateRemaining = () => {
            const now = Date.now();

            if (now >= target && now <= endTime) {
                setStatus("ongoing");
                setRemainingTime(0);
            } else if (now < target) {
                setStatus("upcoming");
                const diff = Math.floor((target - now) / 1000);
                setRemainingTime(diff);
            } else {
                setStatus("completed");
                setRemainingTime(0);
            }
        };

        updateRemaining();
        const interval = setInterval(updateRemaining, 1000);
        return () => clearInterval(interval);
    }, [targetDate, durationInMinutes]);

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    const formatted = isNaN(hours)
        ? "--:--:--"
        : `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return { remainingTime, formatted, status };
}

export default useCountdown;
