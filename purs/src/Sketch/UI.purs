module Sketch.UI where
  
import Prelude
import Control.Monad.Eff (Eff)
import Main (SKETCH)
  
foreign import message :: String -> Eff (sketch :: SKETCH) Unit