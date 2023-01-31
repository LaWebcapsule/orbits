import {CdkDeployAction, CdkBoostrapAction} from '@wbce/orbits-fuel'
import { FrontStack } from './cdk-stack'

export class CdkBootstrapFrontStack extends CdkBoostrapAction{
    StackConstructor = FrontStack
}

export class CdkDeployFrontStack extends CdkDeployAction{
    StackConstructor = FrontStack

}