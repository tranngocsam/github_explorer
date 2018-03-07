import { browserHistory } from "react-router";
import _ from "lodash";
import moment from "moment";

export function navigateTo(pathOrEvent) {
  var path;
  if (typeof(pathOrEvent) == "object") {
    path = jQuery(pathOrEvent.target).attr("href");
    pathOrEvent.preventDefault();
  } else {
    path = pathOrEvent;
  }

  browserHistory.push(path);
  scrollToTop();
}

export function scrollToTop(speed) {
  jQuery('html, body').animate({ scrollTop: 0 }, speed || "slow");
}

export function formatDate(date, format) {
  format = format || "MM/DD/YYYY";
  return date ? moment(date).format(format) : date;
}

// Copied from https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
export function humanFileSize(bytes, si) {
  var thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  var units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  var u = -1;

  do {
    bytes /= thresh;
    ++u;
  } while(Math.abs(bytes) >= thresh && u < units.length - 1);

  return bytes.toFixed(1)+' '+units[u];
}
