import Link from "next/link";

function TXButtons() {
  return (
    <div className="flex flex-row items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Link href="/deposit">
          <button className="flex items-center justify-center rounded-2xl bg-primary p-4 text-xl  font-light text-dark ">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.4946 28.7842C16.8414 28.2544 16.6843 27.7723 16.6843 27.3166C16.6843 18.9879 16.6843 10.6538 16.6843 2.31969C16.6843 1.34483 16.8469 0.883893 17.974 1.00575C19.1011 1.12761 20.575 0.66668 21.2253 1.21769C21.9839 1.86407 21.4637 3.33698 21.4691 4.4761C21.4691 12.0631 21.4691 19.6501 21.4691 27.2583V28.9643C22.011 28.4875 22.347 28.1961 22.6721 27.9047C26.3569 24.3178 30.058 20.7416 33.7157 17.1176C34.3551 16.4871 34.7995 16.201 35.4443 17.0646C36.0891 17.9282 37.6823 18.5799 37.6118 19.5494C37.5685 20.376 36.2354 21.1389 35.4443 21.9177C30.2801 26.9775 25.0889 32.0161 19.9519 37.1077C19.2366 37.8123 18.8952 37.8017 18.1853 37.1077C12.5064 31.4916 6.79494 25.9091 1.05098 20.3601C0.319434 19.6607 0.276084 19.2581 1.05098 18.6382C1.9505 17.9335 2.6116 16.45 3.58157 16.4871C4.41607 16.5189 5.20722 17.8487 5.99837 18.6063L15.503 27.9259C15.8335 28.1855 16.1533 28.4663 16.4946 28.7842Z"
                fill="#010101"
              />
            </svg>
          </button>
        </Link>
        <span>Deposit</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link href="/withdraw">
          <button className="flex items-center justify-center rounded-2xl bg-primary p-4 text-xl  font-light text-dark ">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.8987 9.79191C21.5519 10.3217 21.709 10.7986 21.709 11.2542C21.709 19.5881 21.709 27.9167 21.709 36.2507C21.709 37.2255 21.5465 37.6917 20.4194 37.5646C19.2922 37.4374 17.8183 37.9089 17.1681 37.3579C16.4094 36.7063 16.9296 35.2387 16.9242 34.0943C16.9242 26.5074 16.9242 18.9205 16.9242 11.3125V9.60649C16.3823 10.0886 16.0464 10.38 15.7212 10.6661C12.0364 14.2529 8.33537 17.8344 4.67765 21.453C4.03823 22.0888 3.59389 22.3749 2.94905 21.506C2.30421 20.6371 0.711069 19.9908 0.781514 19.0212C0.824864 18.1947 2.1579 17.4318 2.94905 16.653C8.11319 11.5933 13.3044 6.55479 18.4415 1.46862C19.1568 0.758672 19.4982 0.769268 20.208 1.46862C25.887 7.0846 31.5984 12.667 37.3424 18.2159C38.0739 18.9206 38.1173 19.3232 37.3424 19.9378C36.4428 20.6424 35.7817 22.1259 34.8118 22.0888C33.9773 22.0571 33.1861 20.7272 32.395 19.9696L22.8903 10.682C22.5598 10.3853 22.2401 10.1045 21.8987 9.79191Z"
                fill="#010101"
              />
            </svg>
          </button>
        </Link>
        <span>Withdraw</span>
      </div>
    </div>
  );
}

export default TXButtons;
