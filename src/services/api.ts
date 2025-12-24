import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

function getHost() {
  const manifest = (Constants as any).manifest || undefined;
  let hostFromManifest: string | undefined;

  if (manifest) {
    hostFromManifest = manifest.debuggerHost || manifest.hostUri || manifest.host || manifest.packagerOpts?.host;
  }

  if (hostFromManifest) {
    return hostFromManifest.split(":")[0];
  }

  return "localhost";
}

const inferredHost = getHost();
const hostForAndroid = inferredHost === "localhost" ? "10.0.2.2" : inferredHost;
const baseURL = Platform.OS === "android" ? `http://${hostForAndroid}:3000/api` : `http://${inferredHost}:3000/api`;

export const api = axios.create({ baseURL });
