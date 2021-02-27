#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "peertalk/Peertalk.h"
#import "peertalk/PTChannel.h"
#import "peertalk/PTPrivate.h"
#import "peertalk/PTProtocol.h"
#import "peertalk/PTUSBHub.h"

FOUNDATION_EXPORT double peertalkVersionNumber;
FOUNDATION_EXPORT const unsigned char peertalkVersionString[];

