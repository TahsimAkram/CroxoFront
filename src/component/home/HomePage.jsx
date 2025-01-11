import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base64Decode } from "../util/APICalls";
import axios from "axios";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import CurrencyBitcoinRoundedIcon from "@mui/icons-material/CurrencyBitcoinRounded";
import "./HomePage.css";
import { Avatar, Box, IconButton } from "@mui/material";
import sampleChart from "../../images/btcOrange.png";
import btcYellow from "../../images/btcYellow.png";
import btcblue from "../../images/btcblue.png";
import eth from "../../images/eth.png";
import sol from "../../images/sol.png";
import doge from "../../images/doge.png";
import chart from "../../images/chart.png";
import bnb from "../../images/bnb.png";
import avatarlogo from "../../images/avatar.png";
import { Traft_Get_Api } from "../util/APIs";
import AChart from "./AChart";

const HomePage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const checkIfLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = base64Decode(token);
      const user = decoded.split("#_")[0];
      getData(user);
    }
    return !!token;
  };
  const getData = async (email) => {
    try {
      await axios.post(Traft_Get_Api, { email }).then((response) => {
        console.log(response.data);
        if (response.data.error == "error") {
          navigate("/login");
        } else {
          setAmount(response.data.amount);
        }
      });
    } catch (err) {}
  };

  const [isLoggedIn, setIsLoggedIn] = useState(checkIfLoggedIn());

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  return (
    <div>
      <div className="dcontainer">
        <div className="dleftPan">
          <div className="dlogoConatiner">
            <PieChartRoundedIcon
              sx={{
                color: "rgb(242, 255, 1)",
                fontSize: "3.8rem",
              }}
            />
          </div>
          <div className="dnavColumn">
            <div className="dselectedMenu dmenuContainer ">
              <span className="dnavColumnIcon">
                <GridViewRoundedIcon
                  sx={{
                    color: "rgb(242, 255, 1)",
                    fontSize: "1.8rem",
                  }}
                />
              </span>
              Dashboard
            </div>
            <div className="dmenuContainer">
              <span className="dnavColumnIcon">
                <PermIdentityRoundedIcon
                  sx={{
                    fontSize: "1.8rem",
                  }}
                />
              </span>
              Account
            </div>
            <div className="dmenuContainer">
              <span className="dnavColumnIcon">
                <PieChartOutlineOutlinedIcon
                  sx={{
                    fontSize: "1.8rem",
                  }}
                />
              </span>
              Chart
            </div>
            <div className="dmenuContainer">
              <span className="dnavColumnIcon">
                <FeedRoundedIcon
                  sx={{
                    fontSize: "1.8rem",
                  }}
                />
              </span>
              News
            </div>
            <div className="dmenuContainer">
              <span className="dnavColumnIcon">
                <SettingsRoundedIcon
                  sx={{
                    fontSize: "1.8rem",
                  }}
                />
              </span>
              Settings
            </div>
            <div className="dmenuContainer" onClick={() => logOut()}>
              <span className="dnavColumnIcon">
                <LogoutRoundedIcon
                  sx={{
                    fontSize: "1.8rem",
                  }}
                />
              </span>
              Log Out
            </div>
          </div>
        </div>
        <div className="drightPan">
          <div className="dbrandContainer">
            <div className="dbrandSubContainer">
              <div className="dbrandName">Dashboard</div>
              <div className="dsearchBox">
                <span className="dsearchBoxIcon">
                  <SearchRoundedIcon
                    sx={{
                      color: "white",
                    }}
                  />
                </span>
                <span className="dsearchBoxIcon">Search</span>
              </div>
              <div className="dnavbarIconContainer">
                <div>
                  <MailOutlineRoundedIcon
                    sx={{
                      color: "white",
                      fontSize: "2.2rem",
                    }}
                  />
                </div>
                <div>
                  <NotificationsNoneRoundedIcon
                    sx={{
                      color: "white",
                      fontSize: "2.2rem",
                    }}
                  />
                </div>
                <div>
                  <Box>
                    <IconButton
                      sx={{
                        backgroundColor: "yellow",
                        padding: "0",
                      }}
                    >
                      <Avatar alt="Remy Sharp" src={avatarlogo} />
                    </IconButton>
                  </Box>
                </div>
              </div>
            </div>
          </div>
          <div className="dDashboardDetailsContainer">
            <div className="drow1">
              <div className="dBalanceHeader">
                <div>TOTAL BALANCE</div>
              </div>
              <div className="dBalanceDetailsContainer">
                <div className="dBalanceAmountDetails">
                  <span className="dBalanceAmountIcon">
                    <AttachMoneyRoundedIcon
                      sx={{
                        fontSize: "1.15em",
                      }}
                    />
                  </span>
                  <span className="dBalanceAmount">{amount}</span>
                  <span className="dBalanceAmount decimal">.00</span>
                </div>
                <div className="dbalanceGrow">
                  <div className="dbBalanceDayWise">
                    <div>Today</div>
                    <div>
                      <span>0.0 %</span>
                      <span style={{ verticalAlign: "middle" }}>
                        <ArrowOutwardRoundedIcon
                          sx={{ color: "rgb(34 255 34);", fontSize: "1.2em" }}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="dbBalanceDayWise">
                    <div>7 Days</div>
                    <div>
                      <span>0.0 %</span>
                      <span style={{ verticalAlign: "middle" }}>
                        <ArrowOutwardRoundedIcon
                          sx={{ color: "rgb(34 255 34);", fontSize: "1.2em" }}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="dbBalanceDayWise" style={{ border: "none" }}>
                    <div>30 Days</div>
                    <div>
                      <span>0.0 %</span>
                      <span style={{ verticalAlign: "middle" }}>
                        <ArrowOutwardRoundedIcon
                          sx={{ color: "rgb(34 255 34);", fontSize: "1.2em" }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="drow2">
              <div className="cryptoBox">
                <div className="cryptoBoxRow1">
                  <div className="cryptoboxleftPan">
                    <div className="cryptoBoxBTCIcon">
                      <CurrencyBitcoinRoundedIcon
                        sx={{ color: "yellow", fontSize: "1.em" }}
                      />
                    </div>
                    <div className="cryptoBoxDetail">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontFamily: "roboto",
                          color: "white",
                        }}
                      >
                        Bitcoin
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          fontSize: "0.8em",
                          color: "grey",
                        }}
                      >
                        BTC
                      </div>
                    </div>
                  </div>
                  <div className="cryptoBoxArrow">
                    <CallMadeRoundedIcon sx={{ fontSize: "1em" }} />
                  </div>
                </div>
                <div className="cryptoBoxRow1Sub">
                  <div>
                    <div className="btcPriceTrend">
                      <span className="btcPriceTrendDollar">
                        <AttachMoneyRoundedIcon sx={{ fontSize: "1.1em" }} />
                      </span>
                      <span className="btcPriceTrendAmount">100,545.12</span>
                    </div>
                    <div className="btcTrendPercnt">+ 11.23%</div>
                  </div>
                  <div className="btcchartdiv">
                    <img src={sampleChart} alt="Trends"></img>
                  </div>
                </div>
              </div>
              <div className="cryptoBox">
                <div className="cryptoBoxRow1">
                  <div className="cryptoboxleftPan">
                    <div className="cryptoBoxBTCIcon" style={{ width: "20px" }}>
                      <img
                        src={sol}
                        alt="sol"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="cryptoBoxDetail">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontFamily: "roboto",
                          color: "white",
                        }}
                      >
                        Solana
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          fontSize: "0.8em",
                          color: "grey",
                        }}
                      >
                        SOL
                      </div>
                    </div>
                  </div>
                  <div className="cryptoBoxArrow">
                    <CallMadeRoundedIcon sx={{ fontSize: "1em" }} />
                  </div>
                </div>
                <div className="cryptoBoxRow1Sub">
                  <div>
                    <div className="btcPriceTrend">
                      <span className="btcPriceTrendDollar">
                        <AttachMoneyRoundedIcon sx={{ fontSize: "1.1em" }} />
                      </span>
                      <span className="btcPriceTrendAmount">545.25</span>
                    </div>
                    <div className="btcTrendPercnt">+ 15.23%</div>
                  </div>
                  <div className="btcchartdiv">
                    <img src={btcYellow} alt="Trends"></img>
                  </div>
                </div>
              </div>
              <div className="cryptoBox">
                <div className="cryptoBoxRow1">
                  <div className="cryptoboxleftPan">
                    <div className="cryptoBoxBTCIcon" style={{ width: "18px" }}>
                      <img
                        src={eth}
                        alt="eth"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="cryptoBoxDetail">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontFamily: "roboto",
                          color: "white",
                        }}
                      >
                        Ethereum
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          fontSize: "0.8em",
                          color: "grey",
                        }}
                      >
                        ETH
                      </div>
                    </div>
                  </div>
                  <div className="cryptoBoxArrow">
                    <CallMadeRoundedIcon sx={{ fontSize: "1em" }} />
                  </div>
                </div>
                <div className="cryptoBoxRow1Sub">
                  <div>
                    <div className="btcPriceTrend">
                      <span className="btcPriceTrendDollar">
                        <AttachMoneyRoundedIcon sx={{ fontSize: "1.1em" }} />
                      </span>
                      <span className="btcPriceTrendAmount">3,545.25</span>
                    </div>
                    <div className="btcTrendPercnt">+ 18.23%</div>
                  </div>
                  <div className="btcchartdiv">
                    <img src={btcblue} alt="Trends"></img>
                  </div>
                </div>
              </div>
              <div className="cryptoBox">
                <div className="cryptoBoxRow1">
                  <div className="cryptoboxleftPan">
                    <div className="cryptoBoxBTCIcon" style={{ width: "18px" }}>
                      <img
                        src={doge}
                        alt="doge"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="cryptoBoxDetail">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontFamily: "roboto",
                          color: "white",
                        }}
                      >
                        Dogecoin
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          fontSize: "0.8em",
                          color: "grey",
                        }}
                      >
                        DOGE
                      </div>
                    </div>
                  </div>
                  <div className="cryptoBoxArrow">
                    <CallMadeRoundedIcon sx={{ fontSize: "1em" }} />
                  </div>
                </div>
                <div className="cryptoBoxRow1Sub">
                  <div>
                    <div className="btcPriceTrend">
                      <span className="btcPriceTrendDollar">
                        <AttachMoneyRoundedIcon sx={{ fontSize: "1.1em" }} />
                      </span>
                      <span className="btcPriceTrendAmount">0.3290</span>
                    </div>
                    <div className="btcTrendPercnt">+ 10.13%</div>
                  </div>
                  <div className="btcchartdiv">
                    <img src={sampleChart} alt="Trends"></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="drow3">
              <div className="drow3left">
                <div className="portfolioHeading">Hot Portfolio</div>
                <div className="pfoliocontainer">
                  <div className="cryptoboxleftPan">
                    <div className="cryptoBoxBTCIcon">
                      <CurrencyBitcoinRoundedIcon
                        sx={{ color: "yellow", fontSize: "1.em" }}
                      />
                    </div>
                    <div className="pcryptoBoxDetail">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontFamily: "roboto",
                        }}
                      >
                        Bitcoin
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          fontSize: "0.8em",
                          color: "grey",
                        }}
                      >
                        BTC
                      </div>
                    </div>
                  </div>
                  <div className="cryptoBoxDetail">
                    <div
                      style={{
                        fontWeight: "bold",
                        fontFamily: "roboto",
                        fontSize: "1.2em",
                      }}
                    >
                      13.7%
                    </div>
                    <div className="pfoliopercent">+3.25%</div>
                  </div>
                </div>
                <div className="pfoliocontainer">
                  <div className="cryptoboxleftPan">
                    <div className="cryptoBoxBTCIcon" style={{ width: "20px" }}>
                      <img
                        src={sol}
                        alt="sol"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="pcryptoBoxDetail">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontFamily: "roboto",
                        }}
                      >
                        Solana
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          fontSize: "0.8em",
                          color: "grey",
                        }}
                      >
                        SOL
                      </div>
                    </div>
                  </div>
                  <div className="cryptoBoxDetail">
                    <div
                      style={{
                        fontWeight: "bold",
                        fontFamily: "roboto",
                        fontSize: "1.2em",
                      }}
                    >
                      18.7%
                    </div>
                    <div className="pfoliopercent">+1.35%</div>
                  </div>
                </div>
                <div className="pfoliocontainer">
                  <div className="cryptoboxleftPan">
                    <div className="cryptoBoxBTCIcon" style={{ width: "18px" }}>
                      <img
                        src={eth}
                        alt="eth"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="pcryptoBoxDetail">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontFamily: "roboto",
                        }}
                      >
                        Ethereum
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          fontSize: "0.8em",
                          color: "grey",
                        }}
                      >
                        ETH
                      </div>
                    </div>
                  </div>
                  <div className="cryptoBoxDetail">
                    <div
                      style={{
                        fontWeight: "bold",
                        fontFamily: "roboto",
                        fontSize: "1.2em",
                      }}
                    >
                      16.7%
                    </div>
                    <div className="pfoliopercent">+2.45%</div>
                  </div>
                </div>
                <div className="pfoliocontainer">
                  <div className="cryptoboxleftPan">
                    <div className="cryptoBoxBTCIcon" style={{ width: "18px" }}>
                      <img
                        src={doge}
                        alt="doge"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                    <div className="pcryptoBoxDetail">
                      <div
                        style={{
                          fontWeight: "bold",
                          fontFamily: "roboto",
                        }}
                      >
                        Dogecoin
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          fontSize: "0.8em",
                          color: "grey",
                        }}
                      >
                        DOGE
                      </div>
                    </div>
                  </div>
                  <div className="cryptoBoxDetail">
                    <div
                      style={{
                        fontWeight: "bold",
                        fontFamily: "roboto",
                        fontSize: "1.2em",
                      }}
                    >
                      21.7%
                    </div>
                    <div className="pfoliopercent">+5.77%</div>
                  </div>
                </div>
              </div>

              <AChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
