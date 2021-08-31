import React from 'react';
import { Dimensions, useWindowDimensions, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'tailwind-rn';
import Text from '../components/text/text';

type GridItemProps = View['props'] & {
  span?: number;
}

function GridItem(props: GridItemProps) {
  return null;
}

type GridProps = ViewProps & {
  gap?: number;
  cols?: number;
};

class Grid extends React.Component<GridProps> {
  static GridItem = GridItem;

  render() {
    const {cols = 1.0, gap = 0.0, ...rest} = this.props;
    const colWidth = 100.0 / cols;

    const items = (React.Children.toArray(this.props.children)
      .filter(child => (child as React.ReactElement).type === GridItem)) as React.ReactElement<GridItemProps>[];

    return (
      <View {...rest}>
        <View style={tailwind("flex-row flex-wrap")}>
          {items.map((child, i) => {
            const {span = 1, ...rest} = child.props;
            return (
              <View key={i} style={{
                width: `${colWidth * span}%`,
                padding: gap / 2.0,
              }}>
                <View {...rest} />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const SmallShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.18,
  shadowRadius: 1.00,
  
  elevation: 1,
};

export default function SettingsScreen() {
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <Grid cols={3} gap={12.0}>
        <GridItem style={[tailwind("bg-gray-50 items-center justify-center p-8 rounded-lg"), SmallShadow]}>
          <Text>1</Text>
        </GridItem>
        <GridItem span={2} style={[tailwind("bg-gray-50 items-center justify-center p-8 rounded-lg"), SmallShadow]}>
          <Text>2</Text>
        </GridItem>
        <GridItem span={3} style={[tailwind("bg-gray-50 items-center justify-center p-8 rounded-lg"), SmallShadow]}>
          <Text>3</Text>
        </GridItem>
        <GridItem style={[tailwind("bg-gray-50 items-center justify-center p-8 rounded-lg"), SmallShadow]}>
          <Text>4</Text>
        </GridItem>
        <GridItem style={[tailwind("bg-gray-50 items-center justify-center p-8 rounded-lg"), SmallShadow]}>
          <Text>5</Text>
        </GridItem>
      </Grid>
    </SafeAreaView>
  );
}
