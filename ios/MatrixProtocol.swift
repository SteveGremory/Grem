//
//  MatrixProtocol.swift
//  Grem
//
//  Created by Steve Gremory on 18/02/21.
//

import Foundation
import UIKit
import MatrixSDK

@objc(HelloWorld)

class HelloWorld: NSObject, RCTBridgeModule{
  
  static func moduleName() -> String!{
    return "HelloWorld";
  }
  
  static func requireMainQueueSetup () -> Bool {
    return true;
  }

  @objc
  func ShowMessage(_ message:NSString, duration:Double) -> Void {
    let alert = UIAlertController(title:nil, message: message as String, preferredStyle: .alert);
    let seconds:Double = duration;
    alert.view.backgroundColor = .black
    alert.view.alpha = 0.5
    alert.view.layer.cornerRadius = 14
    
    DispatchQueue.main.async {
      (UIApplication.shared.delegate as? AppDelegate)?.window.rootViewController?.present(alert, animated: true, completion: nil);
    }
    
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + seconds, execute: {
      alert.dismiss(animated: true, completion: nil);
    })
  }
  func matrix() -> Void {
    let credentials = MXCredentials(homeServer: "http://matrix.org",
                                    userId: "@your_user_id:matrix.org",
                                    accessToken: "your_access_token")

    // Create a matrix client
    let mxRestClient = MXRestClient(credentials: credentials, unrecognizedCertificateHandler: nil)

    // Create a matrix session
    let mxSession = MXSession(matrixRestClient: mxRestClient)

    // Launch mxSession: it will first make an initial sync with the homeserver
    mxSession.start { response in
        guard response.isSuccess else { return }

        // mxSession is ready to be used
        // now wer can get all rooms with:
        mxSession.rooms
    }
  }
}
