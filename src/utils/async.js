import {urlAllQuiz} from "../other/url";

export function formatUrlGetQuiz(id) {
  const idx = urlAllQuiz.indexOf('.json');
  return urlAllQuiz.slice(0, idx) + `/${id}.json`
}