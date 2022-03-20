import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material'
import { useEffect } from 'react';
import { useUserStore } from '../stores/useUserStore'

const pages = [
  {
    name: 'Console',
    path: '/',
  },
  {
    name: 'File Manager',
    path: '/file',
  },
  {
    name: 'Plugin / Mods',
    path: '/plugin',
  },
  {
    name: 'Version',
    path: '/version',
  },
  {
    name: 'Schedule',
    path: '/schedule',
  },
  {
    name: 'Startup',
    path: '/startup',
  },
  {
    name: 'Billing',
    path: '/billing',
  },
  {
    name: 'Setting',
    path: '/setting',
  },
]
const settings = [
  {
    name: 'Profile',
    path: '/setting',
  },
  {
    name: 'Account',
    path: '/setting',
  },
  {
    name: 'Dashboard',
    path: '/setting',
  },
  {
    name: 'Logout',
    path: '/setting',
  },
]

const queryClient = new QueryClient()

const theme = createTheme({})

function MyApp({ Component, pageProps }: AppProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const { push,pathname } = useRouter()

  const { user, token, } = useUserStore();
  
  useEffect(() => {
    
    
    if (!token && pathname !== "/login") {
      push("/login");
    }


  },[user, token, pathname, push])
  

  return (
    <Box>
      <video
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
        autoPlay
        loop
        muted
      >
        <source src="https://rr1---sn-xmjxajvh-jb3r.googlevideo.com/videoplayback?expire=1647215739&ei=GzAuYpC2H_Kl4t4PnJiB-Ag&ip=140.213.186.213&id=o-AI6kTYdmUSCYa10zscL6aaQf3Am8X9QQwzJyv-qBIHS3&itag=247&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&mh=lp&mm=31%2C29&mn=sn-xmjxajvh-jb3r%2Csn-xmjxajvh-jb3z&ms=au%2Crdu&mv=m&mvi=1&pl=24&initcwndbps=548750&vprv=1&mime=video%2Fwebm&ns=a5mkGnGUzbnbQtZo_fqc9i0G&gir=yes&clen=295947106&dur=2481.266&lmt=1638646659611534&mt=1647193762&fvip=6&keepalive=yes&fexp=24001373%2C24007246&c=WEB_EMBEDDED_PLAYER&txp=4432434&n=6WPtWzfR3Ee5xQ&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgDfSQQ8Zq18M7CZCb0YM4KeCQfuaZ9f61jpXD4fqqTcgCIQDTEgGytvCqaKqW-IcHE1m7HSkjfC_MYJrabiuFLfbSNQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAMxY8b_ElEVwnPFn7POT_kIiaVepPSzpUJQnZQgnXTW3AiEA9enGFnIpC0aLOOwlJxN_xdXNhmaO0umAVZUQmJFXS18%3D&alr=yes&cpn=aRKMUb1nOVVhQfsP&cver=1.20220309.01.01&range=0-389493&rn=1&rbuf=0" />
      </video>

      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppBar position="static" sx={{}}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                  LOGO
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem
                        key={page.name}
                        onClick={() => {
                          handleCloseNavMenu()
                          push(page.path)
                        }}
                      >
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                  LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    <Button
                      key={page.name}
                      onClick={() => {
                        handleCloseNavMenu()
                        push(page.path)
                      }}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Button variant="contained">Ubah Background</Button>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.name}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </Box>
  )
}

export default MyApp
