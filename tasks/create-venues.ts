import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { PostDataStruct } from '../typechain-types/LensHub';
import { getAddrs, initEnv, waitForTx, ZERO_ADDRESS } from './helpers/utils';
import { defaultAbiCoder } from 'ethers/lib/utils';

task('create-venues', 'publishes a post').setAction(async ({}, hre) => {
  const [governance, , , domain] = await initEnv(hre);
  const addrs = getAddrs();
  const emptyCollectModuleAddr = addrs['free collect module'];
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

  console.log(emptyCollectModuleAddr);

  await waitForTx(lensHub.whitelistCollectModule(emptyCollectModuleAddr, true));

  const _collectModuleInitData = defaultAbiCoder.encode(["bool"],[false])

  // Venue 1
  let inputStruct: PostDataStruct = {
    profileId: 1,
    contentURI:
      'https://ipfs.fleek.co/ipfs/plantghostplantghostplantghostplantghostplantghostplantghos',
    collectModule: emptyCollectModuleAddr,
    collectModuleInitData: _collectModuleInitData,
    referenceModule: ZERO_ADDRESS,
    referenceModuleInitData: [],
  };

  await waitForTx(lensHub.connect(domain).post(inputStruct));
  console.log(await lensHub.getPub(1, 1));

  // Venue 2
  inputStruct = {
    profileId: 1,
    contentURI:
      'https://ipfs.fleek.co/ipfs/plantghostplantghostplantghostplantghostplantghostplantghos',
    collectModule: emptyCollectModuleAddr,
    collectModuleInitData: _collectModuleInitData,
    referenceModule: ZERO_ADDRESS,
    referenceModuleInitData: [],
  };

  await waitForTx(lensHub.connect(domain).post(inputStruct));
  console.log(await lensHub.getPub(1, 2));

  // Venue 3
  inputStruct = {
    profileId: 1,
    contentURI:
      'https://ipfs.fleek.co/ipfs/plantghostplantghostplantghostplantghostplantghostplantghos',
    collectModule: emptyCollectModuleAddr,
    collectModuleInitData: _collectModuleInitData,
    referenceModule: ZERO_ADDRESS,
    referenceModuleInitData: [],
  };

  await waitForTx(lensHub.connect(domain).post(inputStruct));
  console.log(await lensHub.getPub(1, 3));

  // Venue 4
  inputStruct = {
    profileId: 1,
    contentURI:
      'https://ipfs.fleek.co/ipfs/plantghostplantghostplantghostplantghostplantghostplantghos',
    collectModule: emptyCollectModuleAddr,
    collectModuleInitData: _collectModuleInitData,
    referenceModule: ZERO_ADDRESS,
    referenceModuleInitData: [],
  };

  await waitForTx(lensHub.connect(domain).post(inputStruct));
  console.log(await lensHub.getPub(1, 4));  

});


