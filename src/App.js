import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { create } from "ipfs-http-client";
import SignatureCanvas from 'react-signature-canvas';

const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");


export const StyledButton = styled.button`
  padding: 8px;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [NFTS, setNFTs] = useState([]);


  const elementRef = useRef();
  const name = "NFT name";
  const description = "IPFS minted nft wooo."
  const ipfsBaseURL = "https://ipfs.infura.io/ipfs/"

  const mint = (_uri) =>{
    blockchain.smartContract.methods
    .mintNFT(blockchain.account, _uri)
    .send({from: blockchain.account})
    .once("error", (err)=> {
      console.log(err)
      setLoading(true);
      setStatus("Successfully minted your NFT")
    }).then((receipt)=>{
      console.log(receipt)
      setLoading(true);
      setStatus("Successfully minted your NFT")
      clearCanvas()
    })
  }

  const createMetaDataAndMint =  async (_name, _desc, _imgBuffer) =>{
    setLoading(true);
    setStatus("Uploading to IPFS")
    try {
      const addedImage = await ipfsClient.add(_imgBuffer);
      console.log(ipfsBaseURL+addedImage.path);
      const metaDataObj = {
        name: _name,
        description: _desc,
        image: ipfsBaseURL + addedImage.path
      }
      const addedMetaData = await ipfsClient.add(JSON.stringify(metaDataObj))
      console.log(ipfsBaseURL + addedMetaData.path)
      mint(ipfsBaseURL + addedMetaData.path)

    } catch(err){
        console.log(err)
    } 
  }

  const startMintingProcess = () => {
    createMetaDataAndMint(name, description, getImageData());
  }

  const fetchMetaDataForNFTs = () => {
    setNFTs([])
      data.allTokens.forEach((nft) => {
        fetch(nft.uri).then((response)=> response.json()).then(
          (metaData)=>{
            setNFTs((prevState)=> [
              ...prevState, 
              { id: nft.id, metaData: metaData}
            ])
          }).catch((err)=>{
            console.log(err)
          })
      })
  }

  const clearCanvas = () => {
    const canvasEL = elementRef.current;
    canvasEL.clear()
  }

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, dispatch]);

  useEffect(()=>{
    fetchMetaDataForNFTs()
  },[data.allTokens])

  const getImageData = () =>{
    const canvasEl = elementRef.current;
    let dataUrl = canvasEl.toDataURL("image/png");
    const buffer  = Buffer(dataUrl.split(",")[1], "base64");
    return buffer;
  }

  return (
    <s.Screen>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the Blockchain</s.TextTitle>
          <s.SpacerSmall />
          <StyledButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            CONNECT
          </StyledButton>
          <s.SpacerSmall />
          {blockchain.errorMsg !== "" ? (
            <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
          <s.TextTitle style={{ textAlign: "center" }}>
            Mint your: {data.name}.
          </s.TextTitle>
          <SignatureCanvas 
            canvasProps={{width:350, height:350}}
            backgroundColor={'white'}
            ref={elementRef}
          />
          {
            status!=="" ?
              <>
                <s.SpacerSmall />
                <s.TextDescription>{status}</s.TextDescription>
              </>
              :
              <StyledButton
                onClick={(e) => {
                  e.preventDefault();
                  startMintingProcess()
                }}
              >
                mint
              </StyledButton>
          }
          <StyledButton
            onClick={(e) => {
              e.preventDefault();
              clearCanvas()
            }}
          >
            Clear
          </StyledButton>
          <s.SpacerLarge/>
          { 
             data.loading? 
            <>
              <s.SpacerSmall />
              <s.TextDescription>{status}</s.TextDescription>
            </>
            :
            NFTS.map((nft, index) => {
              return(
                <s.Container key={index} style={{padding:16}}>
                  <s.TextTitle >
                    {nft.metaData.name}
                    <img alt={nft.metaData.name}  src={nft.metaData.image} width={150}/>
                  </s.TextTitle>
                </s.Container>
              );
            })
          }

        </s.Container>
      )}


    </s.Screen>
  );
}

export default App;
