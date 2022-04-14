import GlobalHelper from "../../Helpers/GlobalHelper";

const CalendarRightSide = ({users}) => {
    return (
        <div className="mt-8 flex flex-col text-center sm:mt-0 sm:w-1/3 sm:pl-4 md:-mb-5">
            {GlobalHelper.getCalendarWeekText()}

            <div className="flex-grow overflow-y-auto md:h-[364px]">
                <div>
                    <a
                    className="text-bookingdarker hover:bg-brand hover:text-brandcontrast dark:hover:bg-darkmodebrand dark:hover:text-darkmodebrandcontrast mb-2 block rounded-sm border bg-white py-4 font-medium hover:text-white dark:border-transparent dark:bg-gray-600 dark:text-neutral-200 dark:hover:border-black border-brand"
                    data-testid="time"
                    href="#">7:00pm</a>
                </div>

                <div>
                    <a
                    className="text-bookingdarker hover:bg-brand hover:text-brandcontrast dark:hover:bg-darkmodebrand dark:hover:text-darkmodebrandcontrast mb-2 block rounded-sm border bg-white py-4 font-medium hover:text-white dark:border-transparent dark:bg-gray-600 dark:text-neutral-200 dark:hover:border-black border-brand"
                    data-testid="time"
                    href="#">7:20pm</a>
                </div>
            </div>
        </div>
    );
}

export default CalendarRightSide;