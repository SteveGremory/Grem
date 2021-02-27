/*
 Copyright 2018 New Vector Ltd

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

#import "MXRoomEventFilter.h"

/**
 `MXRoomFilter` defines a room filter which may be used during Matrix requests.
 */
@interface MXRoomFilter : MXFilterObject

/**
 A list of room IDs to include. If this list is absent then all rooms are included.
 This filter is applied before the filters in ephemeral, state, timeline or account_data.
 */
@property (nonatomic) NSArray<NSString*> *rooms;

/**
 A list of room IDs to exclude. If this list is absent then no rooms are excluded.
 A matching room will be excluded even if it is listed in the 'rooms' filter.
 This filter is applied before the filters in ephemeral, state, timeline or account_data.
 */
@property (nonatomic) NSArray<NSString*> *notRooms;

/**
 The events that aren't recorded in the room history, e.g. typing and receipts,
 to include for rooms.
 */
@property (nonatomic) MXRoomEventFilter *ephemeral;

/**
 Include rooms that the user has left in the sync, default NO.
 */
@property (nonatomic) BOOL includeLeave;

/**
 The state events to include for rooms.
 */
@property (nonatomic) MXRoomEventFilter *state;

/**
 The message and state update events to include for rooms.
 */
@property (nonatomic) MXRoomEventFilter *timeline;

/**
 The per user account data to include for rooms.
 */
@property (nonatomic) MXRoomEventFilter *accountData;

@end
