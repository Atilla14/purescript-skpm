module Main where

import Control.Monad.Eff
import Prelude

import Control.Monad.Eff.Console (CONSOLE)
import Data.Array (unsafeIndex)
import Data.Traversable (sequence)
import Partial.Unsafe (unsafePartial)
import Sketch.Component (Layer)

foreign import log :: forall e a. a -> Eff (console :: CONSOLE | e) Unit

foreign import data SKETCH :: Effect

main :: forall e. Eff (console :: CONSOLE , sketch :: SKETCH | e) Unit
main = do
  log $ unsafePartial $ (unsafeIndex getSelection 0).name