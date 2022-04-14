const CalendarCel = ({disabled, children}) => {
    if (disabled) {
        return (
            <div className="relative w-full" style={{paddingTop: "100%"}}>
                {children ?
                    <button
                        className="absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm text-center hover:border-brand hover:border dark:hover:border-white text-bookinglighter cursor-default font-light hover:border-0"
                        data-testid="day" data-disabled="true" disabled="">{children}
                    </button>
                    : <div></div>}
            </div>
        );
    }

    return (
        <div className="relative w-full" style={{paddingTop: "100%"}}>
            <button
                className="absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm text-center hover:border-brand hover:border dark:hover:border-white font-medium  bg-gray-100 dark:bg-gray-600 dark:text-white"
                data-testid="day" data-disabled="false">{children}
            </button>
        </div>
    );
}

export default CalendarCel;