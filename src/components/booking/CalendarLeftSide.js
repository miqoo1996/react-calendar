const CalendarLeftSide = () => {
    return (
        <div className="pr-8 sm:border-r sm:dark:border-gray-700 md:flex md:flex-col sm:w-1/3">
            <h2 className="dark:text-bookinglight mt-3 font-medium text-gray-500">Outbound Consulting, Inc.</h2>
            <h1 className="font-cal text-bookingdark mb-4 text-3xl font-semibold dark:text-white">Consulting
                Call</h1>

            <p className="text-bookinglight mb-1 -ml-2 px-2 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                     aria-hidden="true" className="mr-1 -mt-1 inline-block h-4 w-4">
                    <path fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd" />
                </svg>
                60 Minutes
            </p>

            <div data-state="closed">
                <button type="button" aria-controls="radix-460" aria-expanded="false"
                        data-state="closed"
                        className="min-w-32 text-bookinglight mb-1 -ml-2 px-2 py-1 text-left">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true" className="mr-1 -mt-1 inline-block h-4 w-4">
                        <path fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                              clipRule="evenodd" />
                    </svg>
                    Asia/Yerevan
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true" className="ml-1 -mt-1 inline-block h-4 w-4">
                        <path fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd" />
                    </svg>
                </button>
                <div data-state="closed" id="radix-460" hidden>&nbsp;</div>

                <p className="mt-3 mb-8 text-gray-600 dark:text-gray-200">This is an opt-in meeting,
                    which means we may reject your booking request and follow up by email for more
                    details. Tell us more about yourself in the "additional notes"</p>
            </div>
        </div>
    );
}

export default CalendarLeftSide;