function getAppointmentButtonState(appointmentDateStr, durationInMinutes) {
    if (!appointmentDateStr || !durationInMinutes) return { join: false, report: false };

    const now = new Date();
    const appointmentDate = new Date(appointmentDateStr);
    const appointmentEnd = new Date(appointmentDate.getTime() + durationInMinutes * 60000);

    const timeUntilStart = (appointmentDate - now) / 60000; // دقائق
    const hasStarted = now >= appointmentDate;
    const hasEnded = now >= appointmentEnd;

    return {
        join: timeUntilStart <= 15 && !hasEnded,
        report: hasEnded,
    };
}

export default getAppointmentButtonState