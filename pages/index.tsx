import {
  Chip,
  Box,
  Button,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import axios from "axios";
import {
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
const KEY = "xFyUvV5FsZen4n1qYsP9tNq6kj4bmRIwCjncwHyg1GQXhRFm";
const uuid = "d74e20de";
const client = axios.create({
  baseURL: "https://prototype.exluhost.my.id/",
  headers: {
    Authorization: `Bearer ${KEY}`,
    "Content-Type": "application/json",
    Accept: "Application/vnd.pterodactyl.v1+json",
  },
});

const Home: NextPage = () => {
  useEffect(() => {
    // client.get("https://prototype.exluhost.my.id/api/client")
    // .then(res => {
    //   console.log(res.data)
    // })
  }, []);
  const { data: d2 } = useQuery(
    "test",
    async () => await axios.get("/api/hello")
  );

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [category, setCategory] = useState(0);

  const { data: plugins } = useQuery("plugins", async () => {
    let url = `https://api.spiget.org/v2/resources?size=16&sort=-downloads&page=${page}`;

    if (search.length > 0) {
      url = `https://api.spiget.org/v2/search/resources/${search}?size=16&page=${page}`;
    } else if (category != 0) {
      url = `https://api.spiget.org/v2/categories/${category}/resources?size=16&sort=-downloads&page=${page}`;
    }

    return await axios.get(url);
  });

  return (
    <div>
      {/* {data?.data?.map(
        (e: {
          name:
            | boolean
            | ReactChild
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
          id: Key | null | undefined;
        }) => (
          <Chip label={e.name} key={e.id} />
        )
      )} */}
      <Pagination count={10} color="primary" />
      <Grid container spacing={2}>
        {plugins?.data.map((e: any, i: number) => (
          <Grid item xs={3} key={i}>
            <PluginView plugin={e} uuid={uuid} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={10} color="primary" />
    </div>
  );
};

const PluginView = ({ plugin, uuid }: { plugin: any; uuid: string }) => {
  const handle = async () => {
    let dl =
      "https://cdn.spiget.org/file/spiget-resources/" + plugin.id + ".jar";

    if (plugin.external) {
      const validJar = plugin.file.externalUrl
        ?.split("/")
        ?.pop()
        ?.split("#")[0]
        .split("?")[0]
        .includes(".jar");

      if (false) {
        dl = plugin.file.externalUrl;
      } else {
        window.open(plugin.file.externalUrl);

        let jar = window.prompt("Whats is the jar url download ? : ");

        if (!jar) {
          alert("Please enter a valid url");
          return;
        }

        dl = jar;
      }
    }

    const filename = dl?.split("/")?.pop()?.split("#")[0].split("?")[0];

    if (!filename) return;

    const { status } = await client.post(
      `/api/client/servers/${uuid}/files/pull`,
      {
        url: dl,
        directory: "/plugins",
      }
    );

    if (status == 204) {
      setTimeout(async () => {
        const secondfilename = string_to_slug(plugin.name) + ".jar";
        client
          .put(`/api/client/servers/${uuid}/files/rename`, {
            root: "/plugins",
            files: [
              {
                from: filename,
                to: secondfilename,
              },
            ],
          })
          .then(async (e) => {
            let status3 = 0;
            try {
              await client.head(
                `api/client/servers/${uuid}/files/contents?file=/plugins/${secondfilename}`
              );

              status3 = 204;
            } catch (error) {
              status3 = 500;
            }

            alert(status3 < 300 ? "Success" : "Failed download " + dl);
          });
      }, 1500);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <img
        src={"data:image/png;base64," + plugin.icon.data}
        alt={plugin.icon.url}
      />
      <Typography variant="h4">{plugin.name}</Typography>
      <Typography variant="body1">{plugin.tag}</Typography>
      <Box
        sx={{
          display: "flex",
          gap: 3,
        }}
      >
        <Button variant="contained" onClick={handle}>
          Install
        </Button>
        <Button variant="contained">View Plugin</Button>
      </Box>
    </Paper>
  );
};

function string_to_slug(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text

  return str;
}

export default Home;
