import { BrowserRouter, Route, Switch } from "react-router-dom"

// Componentes
import { Home } from "./pages/Home"

// Páginas
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./pages/Room"

import { AuthContextProvider } from './context/AuthContext'

function App() {
  return (
   <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App