//
//  MatrixProtocol.m
//  Grem
//
//  Created by Steve Gremory on 18/02/21.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <MatrixSDK/MatrixSDK.h>

@interface RCT_EXTERN_MODULE(HelloWorld, NSObject)
RCT_EXTERN_METHOD(ShowMessage:(NSString *)message duration:(double *)duration)
@end
