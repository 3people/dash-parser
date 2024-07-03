const createDashParser = () => {
  const getAttributeValue = (str, attr) => {
    const match = str.match(new RegExp(`${attr}="([^"]*)"`, "i"));
    return match ? match[1] : null;
  };

  const parseRepresentation = (repr) => ({
    id: getAttributeValue(repr, "id"),
    bandwidth: getAttributeValue(repr, "bandwidth"),
    width: getAttributeValue(repr, "width"),
    height: getAttributeValue(repr, "height"),
    frameRate: getAttributeValue(repr, "frameRate"),
  });

  const parseAdaptationSet = (adaptSet) => ({
    mimeType: getAttributeValue(adaptSet, "mimeType"),
    representations: (adaptSet.match(/<Representation[^>]*>/g) || []).map(
      parseRepresentation
    ),
  });

  const parsePeriod = (period) => ({
    id: getAttributeValue(period, "id"),
    start: getAttributeValue(period, "start"),
    adaptationSets: (
      period.match(/<AdaptationSet[^>]*>[\s\S]*?<\/AdaptationSet>/g) || []
    ).map(parseAdaptationSet),
  });

  const parseManifest = (manifest) => {
    const mpdMatch = manifest.match(/<MPD[^>]*>/);
    if (!mpdMatch) return null;

    const mpd = mpdMatch[0];
    return {
      duration: getAttributeValue(mpd, "mediaPresentationDuration"),
      minBufferTime: getAttributeValue(mpd, "minBufferTime"),
      periods: (manifest.match(/<Period[^>]*>[\s\S]*?<\/Period>/g) || []).map(
        parsePeriod
      ),
    };
  };

  const parse = (manifestString) => {
    return parseManifest(manifestString);
  };

  return { parse };
};
// 사용 예시
const dashParser = createDashParser();

const manifestString = `
<?xml version="1.0" encoding="UTF-8"?>
<MPD xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xmlns="urn:mpeg:dash:schema:mpd:2011"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xsi:schemaLocation="urn:mpeg:DASH:schema:MPD:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd"
     profiles="urn:mpeg:dash:profile:isoff-live:2011"
     type="static"
     mediaPresentationDuration="PT9M56.458S"
     minBufferTime="PT1.5S">
<ProgramInformation>
    <Title>sample.mp4</Title>
</ProgramInformation>
<Location>http://localhost:1935/vod/_definst_/mp4:sample.mp4/manifest_w1759006020.mpd</Location>
<Period id="0" start="PT0.0S">
    <AdaptationSet id="0" mimeType="video/mp4" width="424" height="240" par="16:9" frameRate="24" segmentAlignment="true" startWithSAP="1" subsegmentAlignment="true" subsegmentStartsWithSAP="1">
        <SegmentTemplate timescale="90000" media="chunk_ctvideo_cfm4s_rid$RepresentationID$_cs$Time$_w1759006020_mpd.m4s" initialization="chunk_ctvideo_cfm4s_rid$RepresentationID$_cinit_w1759006020_mpd.m4s">
            <SegmentTimeline>
                <S t="0" d="1012500"/>
                <S d="1012500"/>
                <S d="1012500"/>
                <S d="1012500"/>
                <S d="918720"/>
                <S d="1110060"/>
                <S d="1057500"/>
                <S d="941220"/>
                <S d="1162530"/>
                <S d="900000"/>
                <S d="971190"/>
                <S d="982530"/>
                <S d="1012500"/>
                <S d="933750"/>
                <S d="903780"/>
                <S d="907470"/>
                <S d="1188720"/>
                <S d="945000"/>
                <S d="1061280"/>
                <S d="1095030"/>
                <S d="1117440"/>
                <S d="993780"/>
                <S d="1027530"/>
                <S d="1012500"/>
                <S d="1031220"/>
                <S d="974970"/>
                <S d="967500"/>
                <S d="1031310"/>
                <S d="1173690"/>
                <S d="1106280"/>
                <S d="1012500"/>
                <S d="1012500"/>
                <S d="941220"/>
                <S d="1098810"/>
                <S d="1008720"/>
                <S d="1076220"/>
                <S d="1076310"/>
                <S d="967500"/>
                <S d="1023750"/>
                <S d="1199970"/>
                <S d="911250"/>
                <S d="990000"/>
                <S d="1207530"/>
                <S d="1001250"/>
                <S d="1012500"/>
                <S d="1012500"/>
                <S d="1012500"/>
                <S d="1012500"/>
                <S d="1012500"/>
                <S d="1012500"/>
                <S d="1012500"/>
                <S d="1012500"/>
                <S d="476190"/>
            </SegmentTimeline>
        </SegmentTemplate>
        <Representation id="p0a0r0" codecs="avc1.42c01e" sar="1:1" bandwidth="420000" />
    </AdaptationSet>
    <AdaptationSet id="1" mimeType="audio/mp4" lang="eng" segmentAlignment="true" startWithSAP="1" subsegmentAlignment="true" subsegmentStartsWithSAP="1">
        <Role schemeIdUri="urn:mpeg:dash:role:2011" value="main"/>
        <SegmentTemplate timescale="48000" media="chunk_ctaudio_cfm4s_rid$RepresentationID$_cs$Time$_w1759006020_mpd.m4s" initialization="chunk_ctaudio_cfm4s_rid$RepresentationID$_cinit_w1759006020_mpd.m4s">
            <SegmentTimeline>
                <S t="0" d="540000"/>
                <S d="540000"/>
                <S d="540000"/>
                <S d="540000"/>
                <S d="489984"/>
                <S d="592032"/>
                <S d="564000"/>
                <S d="501984"/>
                <S d="620016"/>
                <S d="480000"/>
                <S d="517968"/>
                <S d="524016"/>
                <S d="540000"/>
                <S d="498000"/>
                <S d="482016"/>
                <S d="483984"/>
                <S d="633984"/>
                <S d="504000"/>
                <S d="566016"/>
                <S d="584016"/>
                <S d="595968"/>
                <S d="530016"/>
                <S d="548016"/>
                <S d="540000"/>
                <S d="549984"/>
                <S d="519984"/>
                <S d="516000"/>
                <S d="550032"/>
                <S d="625968"/>
                <S d="590016"/>
                <S d="540000"/>
                <S d="540000"/>
                <S d="501984"/>
                <S d="586032"/>
                <S d="537984"/>
                <S d="573984"/>
                <S d="574032"/>
                <S d="516000"/>
                <S d="546000"/>
                <S d="639984"/>
                <S d="486000"/>
                <S d="528000"/>
                <S d="644016"/>
                <S d="534000"/>
                <S d="540000"/>
                <S d="540000"/>
                <S d="540000"/>
                <S d="540000"/>
                <S d="540000"/>
                <S d="540000"/>
                <S d="540000"/>
                <S d="540000"/>
                <S d="253968"/>
            </SegmentTimeline>
        </SegmentTemplate>
        <Representation id="p0a1r0" codecs="mp4a.40.2" audioSamplingRate="48000" bandwidth="99000">
        <AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2"/>
        </Representation>
    </AdaptationSet>
</Period>
</MPD>
`;

const result = dashParser.parse(manifestString);
console.log(JSON.stringify(result, null, 2));
