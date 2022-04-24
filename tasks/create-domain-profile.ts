import { task } from 'hardhat/config';
import { LensHub__factory, ModuleGlobals__factory } from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';
import { defaultAbiCoder } from 'ethers/lib/utils';

const DEFAULT_AMOUNT = 10;

task('create-domain-profile', 'creates a profile').setAction(async ({}, hre) => {
    const [governance, , ,domain] = await initEnv(hre);
    const addrs = getAddrs();
    const curatorFeeFollowModuleAddr = addrs['curator follow module'];
    const currencyAddress = addrs['currency']
    const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);
    const moduleGlobals = ModuleGlobals__factory.connect(addrs['module globals'], governance);

    // Whitelisting
    await waitForTx(lensHub.whitelistProfileCreator(domain.address, true));
    await waitForTx(moduleGlobals.connect(governance).whitelistCurrency(currencyAddress, true));
    await waitForTx(lensHub.whitelistFollowModule(curatorFeeFollowModuleAddr, true));
    

    const _followModuleInitData = defaultAbiCoder.encode(["uint256","address","address"],[DEFAULT_AMOUNT,currencyAddress,domain.address]); // amount, currency, recipient

    const inputStruct: CreateProfileDataStruct = {
        to: domain.address,
        handle: 'metadvisor',
        imageURI:
          'https://raw.githubusercontent.com/Project-Recommend-ETHAmsterdam/recobee/main/public/logo.svg',
        followModule: curatorFeeFollowModuleAddr,
        followModuleInitData: _followModuleInitData,
        followNFTURI:
          'https://raw.githubusercontent.com/Project-Recommend-ETHAmsterdam/recobee/main/public/logo.svg',
      };

    await waitForTx(lensHub.connect(domain).createProfile(inputStruct)); // creates domain

    console.log(`Total supply (should be 1): ${await lensHub.totalSupply()}`);
    console.log(`Profile owner: ${await lensHub.ownerOf(1)}, user address (should be the same): ${domain.address}`);
    console.log(
    `Profile ID by handle: ${await lensHub.getProfileIdByHandle(
        'zer0dot'
    )}, user address (should be the same): ${domain.address}`);

    
    // create a few posts as locations


    // let the profile user follow the domain, and submit a curation with paying fee. May need to mint currency to said user
    
  });