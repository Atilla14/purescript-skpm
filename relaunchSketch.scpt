tell application "Sketch"
    set p to path of document 1
end tell

tell application "Sketch"
    reopen
    activate
    set selection to {}
    set target of window 1 to POSIX file p
end tell