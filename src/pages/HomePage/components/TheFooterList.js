import FooterListItem from "./FooterListItem";
import { Button } from "@mui/material";

function TheFooterList() {
  return (
    <>
      <ul>
        {[
          "Legal",
          "Privacy Center",
          "Privacy Policy",
          "About Ads",
          "Accessibility",
          "Cookies",
          "Privacy",
        ].map((label) => (
          <FooterListItem key={label}>{label}</FooterListItem>
        ))}
      </ul>

      <button
        style={{
          marginTop: "30px",
          border: "solid 1px",
          borderRadius: "10px",
          padding: "5px",
          width: "85px",
          height: "35px",
          textAlign: "center",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <svg
          width="20px"
          height="18px"
          viewBox="0 0 24 24"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="languageIconTitle"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          color="white"
          style={{ marginRight: "5px" }}
        >
          {" "}
          <title id="languageIconTitle">Language</title>{" "}
          <circle cx="12" cy="12" r="10" />{" "}
          <path
            strokeLinecap="round"
            d="M12,22 C14.6666667,19.5757576 16,16.2424242 16,12 C16,7.75757576 14.6666667,4.42424242 12,2 C9.33333333,4.42424242 8,7.75757576 8,12 C8,16.2424242 9.33333333,19.5757576 12,22 Z"
          />{" "}
          <path strokeLinecap="round" d="M2.5 9L21.5 9M2.5 15L21.5 15" />{" "}
        </svg>{" "}
        English
      </button>
    </>
  );
}

export default TheFooterList;
