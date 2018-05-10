module Sketch.Component where

foreign import data DocumentMS :: Type

type Flow = String

type Rect = { x :: Number
            , y :: Number
            , width :: Number
            , height :: Number }

newtype Group = Group { id :: String
             , name :: String
             , parent :: Group
             , layers :: Array Layer
             , frame :: Rect
             , flow :: Flow }

type Layer = { id :: String
             , name :: String
             , parent :: Group
             , frame :: Rect
             , selected :: Boolean
             , flow :: Flow }