module Env = {
  let nodeEnv = Node.Process.process["env"]

  let getVariable = (name: string): string => 
    switch Js.Dict.get(nodeEnv, name) {
      | Some(value) => value
      | None => Js.Exn.raiseError(`Environment variable ${name} is missing`)
    }
}