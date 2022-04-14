import GlobalHelper from "../../Helpers/GlobalHelper";
import CalendarCel from "./CalendarCel";

const CalendarContent = () => {
    return (
        <div className="mt-8 sm:mt-0 sm:min-w-[455px] w-full sm:w-1/2 sm:border-r sm:pl-4 sm:pr-6 sm:dark:border-gray-700 md:w-1/3">
            <div className="mb-4 flex text-xl font-light">
                {GlobalHelper.getShortDate()}
                <div className="w-1/2 text-right dark:text-gray-400">
                    <button
                        className="group p-1 ltr:mr-2 rtl:ml-2 text-bookinglighter dark:text-gray-600"
                        data-testid="decrementMonth" disabled="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true"
                             className="h-5 w-5 group-hover:text-black dark:group-hover:text-white">
                            <path fillRule="evenodd"
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="group p-1" data-testid="incrementMonth">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true"
                             className="h-5 w-5 group-hover:text-black dark:group-hover:text-white">
                            <path fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                className="border-bookinglightest grid grid-cols-7 gap-4 border-t border-b text-center dark:border-gray-800 sm:border-0">
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Sun</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Mon</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Tue</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Wed</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Thu</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Fri</div>
                <div className="text-bookinglight my-4 text-xs uppercase tracking-widest">Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
                <CalendarCel disabled={1} />
                <CalendarCel disabled={1} />
                <CalendarCel disabled={1} />
                <CalendarCel disabled={1} />
                <CalendarCel disabled={1} />
                <CalendarCel disabled={1}>1</CalendarCel>
                <CalendarCel disabled={1}>2</CalendarCel>
                <CalendarCel disabled={1}>3</CalendarCel>
                <CalendarCel disabled={1}>4</CalendarCel>
                <CalendarCel disabled={1}>5</CalendarCel>
                <CalendarCel disabled={1}>6</CalendarCel>
                <CalendarCel disabled={1}>7</CalendarCel>
                <CalendarCel disabled={1}>8</CalendarCel>
                <CalendarCel disabled={1}>9</CalendarCel>
                <CalendarCel disabled={1}>10</CalendarCel>
                <CalendarCel disabled={1}>11</CalendarCel>
                <CalendarCel disabled={1}>12</CalendarCel>
                <CalendarCel disabled={1}>13</CalendarCel>
                <div className="relative w-full" style={{paddingTop: "100%"}}>
                    <button
                        className="absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm text-center hover:border-brand hover:border dark:hover:border-white font-medium bg-brand text-brandcontrast dark:bg-darkmodebrand dark:text-darkmodebrandcontrast"
                        data-testid="day" data-disabled="false">14
                    </button>
                </div>
                <CalendarCel>15</CalendarCel>
                <CalendarCel>16</CalendarCel>
                <CalendarCel>17</CalendarCel>
                <CalendarCel>18</CalendarCel>
                <CalendarCel>19</CalendarCel>
                <CalendarCel>20</CalendarCel>
                <CalendarCel>21</CalendarCel>
                <CalendarCel>22</CalendarCel>
                <CalendarCel>23</CalendarCel>
                <CalendarCel>24</CalendarCel>
                <CalendarCel>25</CalendarCel>
                <CalendarCel>26</CalendarCel>
                <CalendarCel>27</CalendarCel>
                <CalendarCel>28</CalendarCel>
                <CalendarCel>29</CalendarCel>
                <CalendarCel>30</CalendarCel>
            </div>
        </div>
    );
}

export default CalendarContent;