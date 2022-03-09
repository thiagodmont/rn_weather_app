import React, { useImperativeHandle, useRef } from 'react'
import { ActivityIndicator, ViewProps, FlatList } from 'react-native'
import { Colors } from 'app/design'
import { Box, Body, Line } from 'app/components/atom'
import withModifiersProps from 'app/design/withModifiersProps'
import withSpaceProps, { Space } from "app/design/withSpaceProps"
import ComponentStyle from 'app/components/molecule/List/styles'

interface ParamsScrollToItem {
  animated?: boolean;
  item: any;
  viewPosition?: number;
}

export interface FlatListRefProps {
  scrollToItem: (params: ParamsScrollToItem) => void;
}

export const useFlatList = () => {
  const list = useRef<FlatListRefProps>(null)

  const scrollToItem = (params: ParamsScrollToItem) => list.current?.scrollToItem(params)

  return { ref: list, scrollToItem }
}
interface Props {
  data: any[];
  renderItem: (item: any) => any;
  renderSeparator?: () => any;
  renderEmpty?: () => any;
  keyName?: string;
  loading?: boolean;
  nestedScrollEnabled?: boolean;
  horizontal?: boolean;
  insideSpace?: boolean;
  style?: ViewProps
}

const List = React.forwardRef<FlatListRefProps, Props>(({ 
  data, 
  horizontal = false, 
  keyName = "id", 
  renderItem, 
  renderSeparator, 
  renderEmpty, 
  loading = false, 
  nestedScrollEnabled = false, 
  insideSpace = false, 
  style
}, ref) => {
  const scrollRef = useRef<FlatList>(null)

  const scrollToItem = (params: ParamsScrollToItem) => {
    scrollRef?.current?.scrollToItem(params)
  }

  useImperativeHandle(ref, () => ({
    scrollToItem,
  }))

  const renderInternalItem = ({ item }) => renderItem(item)

  const renderLoading = () => (
    <>
      {loading && (
        <Box>
          <Body textCenter mb={Space.Medium} mt={Space.Medium}> Aguarde, estamos buscando... </Body>
          <ActivityIndicator />
        </Box>
      )}
    </>
  )

  const _renderSeparator = () => <Line color={Colors.GreyMedium} {...{[horizontal ? 'mh' : 'mv']: Space.Small }} />

  return (
    <ComponentStyle style={style}>
      {(styles) => (
        <FlatList
          ref={scrollRef}
          contentContainerStyle={insideSpace ? styles.insideContainer :  {}}
          horizontal={horizontal}
          nestedScrollEnabled={nestedScrollEnabled}
          style={styles.container}
          data={data}
          renderItem={renderInternalItem}
          keyExtractor={item => item[keyName]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator ?? _renderSeparator}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderLoading} />
      )}
    </ComponentStyle>
  )
})

export default withSpaceProps(withModifiersProps(List))
